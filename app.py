# =============================================================================
# Skill Swap Hub - Flask Application (Sample 01 - 50% Target)
# COM4113 Tech Stack - Leeds Trinity University
# =============================================================================
# This extended version builds on the 40% sample. It includes:
# - All TODOs from Sample 00 completed
# - Category filtering on the timeline
# - Server-side validation with flash messages
# - Custom error pages (404 and 500)
# - Keyword search
# - Timestamps on resource cards
# - Database seeding script support
#
# New TODOs for students are marked below.
# =============================================================================

from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash
)
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime
import os

# =============================================================================
# APP CONFIGURATION
# =============================================================================

app = Flask(__name__)
app.secret_key = "change-this-to-a-random-secret-key"

MONGO_URI = "mongodb+srv://Cbotty:Pass1234@cluster0.3ffc7jf.mongodb.net/?appName=Cluster0"
DB_NAME = "skillswap_db"

# File upload settings
UPLOAD_FOLDER = os.path.join("static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# =============================================================================
# DATABASE CONNECTION
# =============================================================================

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    users_collection = db["users"]
    resources_collection = db["resources"]
    client.admin.command("ping")
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    print("Please check your MONGO_URI in app.py")


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_logged_in_user():
    """Return the logged-in user's document from the database, or None."""
    if "username" in session:
        try:
            user = users_collection.find_one({"username": session["username"]})
            return user
        except Exception as e:
            print(f"Error fetching user: {e}")
            return None
    return None


# =============================================================================
# CUSTOM ERROR HANDLERS
# =============================================================================

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 Internal Server Error with a custom page."""
    return render_template("error500.html"), 500


# =============================================================================
# TODO 3: Create a custom 404 error handler.
# -----------------------------------------------------------------------------
# Follow the same pattern as the 500 error handler above.
# Use @app.errorhandler(404) as the decorator.
# The function should accept an 'error' parameter.
# Return render_template("error404.html") with a 404 status code.
#
# You also need to create the error404.html template file.
# A working error500.html is provided in the templates folder as an example.
#
# Hint: It is almost identical to the 500 handler, just change the number.
# =============================================================================

# YOUR CODE HERE (approximately 3 lines)


# =============================================================================
# ROUTES
# =============================================================================


# --- Home Page ---------------------------------------------------------------
@app.route("/")
def home():
    """Display the home page."""
    user = get_logged_in_user()
    return render_template("index.html", user=user)


# --- User Registration -------------------------------------------------------
@app.route("/register", methods=["GET", "POST"])
def register():
    """
    GET:  Display the registration form.
    POST: Validate input, hash password, and create user in MongoDB.
    """
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()
        bio = request.form.get("bio", "").strip()
        hobbies = request.form.get("hobbies", "").strip()

        # Server-side validation for required fields
        if not username or not email or not password:
            flash("Please fill in all required fields.", "error")
            return redirect(url_for("register"))

        # Check for duplicate username (was TODO 1 in Sample 00, now complete)
        existing_user = users_collection.find_one({"username": username})
        if existing_user:
            flash("Username already exists. Please choose a different one.", "error")
            return redirect(url_for("register"))

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Handle profile photo upload
        profile_photo = "uploads/placeholder.png"
        if "profile_photo" in request.files:
            file = request.files["profile_photo"]
            if file and file.filename != "" and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                unique_name = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
                file.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_name))
                profile_photo = f"uploads/{unique_name}"

        user_doc = {
            "username": username,
            "email": email,
            "password": hashed_password,
            "bio": bio,
            "hobbies": hobbies,
            "profile_photo": profile_photo,
            "created_at": datetime.now()
        }

        try:
            users_collection.insert_one(user_doc)
            flash("Registration successful! Please log in.", "success")
            return redirect(url_for("login"))
        except Exception as e:
            flash(f"Registration failed: {e}", "error")
            return redirect(url_for("register"))

    return render_template("register.html")


# --- User Login (was TODO 2 in Sample 00, now complete) ----------------------
@app.route("/login", methods=["GET", "POST"])
def login():
    """
    GET:  Display the login form.
    POST: Verify credentials and create a session.
    """
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Please enter both username and password.", "error")
            return redirect(url_for("login"))

        try:
            user = users_collection.find_one({"username": username})

            # Completed: password verification and session creation
            if user and check_password_hash(user["password"], password):
                session["username"] = username
                flash("Welcome back!", "success")
                return redirect(url_for("timeline"))
            else:
                flash("Invalid username or password.", "error")
                return redirect(url_for("login"))

        except Exception as e:
            flash(f"Login error: {e}", "error")
            return redirect(url_for("login"))

    return render_template("login.html")


# --- User Logout -------------------------------------------------------------
@app.route("/logout")
def logout():
    """Clear the session and redirect to the home page."""
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for("home"))


# --- Skills Timeline with Filtering and Search -------------------------------
@app.route("/timeline")
def timeline():
    """
    Fetch and display resources from MongoDB.
    Supports optional category filtering and keyword search.
    """
    # Get filter and search parameters from the URL query string
    selected_category = request.args.get("category", "")
    search_query = request.args.get("q", "").strip()

    try:
        # Build the MongoDB query based on filters
        query = {}

        if selected_category:
            query["category"] = selected_category

        if search_query:
            query["$or"] = [
                {"title": {"$regex": search_query, "$options": "i"}},
                {"description": {"$regex": search_query, "$options": "i"}}]
        # Fetch resources using the query, newest first
        resources = list(
            resources_collection.find(query).sort("created_at", -1)
        )

    except Exception as e:
        flash(f"Could not load resources: {e}", "error")
        resources = []

    user = get_logged_in_user()

    # List of categories for the filter dropdown
    categories = [
        "Programming", "Design", "Music", "Photography",
        "Languages", "Cooking", "Fitness", "AI Tools", "Other"
    ]

    return render_template(
        "timeline.html",
        resources=resources,
        user=user,
        categories=categories,
        selected_category=selected_category,
        search_query=search_query
    )


# --- Post a New Resource (with validation) -----------------------------------
@app.route("/post_resource", methods=["GET", "POST"])
def post_resource():
    """
    GET:  Display the resource submission form.
    POST: Validate input and save the resource to MongoDB.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to share a resource.", "error")
        return redirect(url_for("login"))

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        link = request.form.get("link", "").strip()
        description = request.form.get("description", "").strip()
        category = request.form.get("category", "").strip()

        if not title or not description:
            flash("Title and description are required.", "error")
            return redirect(url_for("post_resource"))

        if len(title) > 100:
            flash("Title must be 100 characters or fewer.", "error")
            return redirect(url_for("post_resource"))

        if len(description) < 10:
            flash("Description must be at least 10 characters long.", "error")
            return redirect(url_for("post_resource"))

        resource_doc = {
            "title": title,
            "link": link,
            "description": description,
            "category": category,
            "author": user["username"],
            "author_photo": user.get("profile_photo", "uploads/placeholder.png"),
            "created_at": datetime.now()
        }

        try:
            resources_collection.insert_one(resource_doc)
            flash("Resource shared successfully!", "success")
            return redirect(url_for("timeline"))
        except Exception as e:
            flash(f"Could not save resource: {e}", "error")
            return redirect(url_for("post_resource"))

    return render_template("post_resource.html", user=user)


@app.route("/profile")
def profile():
    """Display the logged-in user's profile and their posted resources."""
    user = get_logged_in_user()
    if not user:
        flash("Please log in to view your profile.", "error")
        return redirect(url_for("login"))

    # Fetch resources posted by this user
    try:
        user_resources = list(
            resources_collection.find(
                {"author": user["username"]}
            ).sort("created_at", -1)
        )
    except Exception:
        user_resources = []

    return render_template(
        "profile.html", user=user, user_resources=user_resources
    )

@app.route("/edit_profile", methods=["GET", "POST"])
def edit_profile():
    """
    GET:  Display the profile edit form.
    POST: Update user details in MongoDB.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to edit your profile.", "error")
        return redirect(url_for("login"))

    if request.method == "POST":
        new_bio = request.form.get("bio", "").strip()
        new_hobbies = request.form.get("hobbies", "").strip()
        new_email = request.form.get("email", "").strip()

        profile_photo = user.get("profile_photo", "uploads/placeholder.png")

    if "profile_photo" in request.files:
        file = request.files["profile_photo"]
        if file and file.filename != "" and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            unique_name = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_name))
            profile_photo = f"uploads/{unique_name}"

    try:
        users_collection.update_one(
            {"username": session["username"]},
            {"$set": {
                "email": new_email,
                "bio": new_bio,
                "hobbies": new_hobbies,
                "profile_photo": profile_photo
            }}
        )
        flash("Profile updated successfully!", "success")
        return redirect(url_for("profile"))
    except Exception as e:
        flash(f"Profile update failed: {e}", "error")
        return redirect(url_for("edit_profile"))

        return render_template("edit_profile.html", user=user)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
