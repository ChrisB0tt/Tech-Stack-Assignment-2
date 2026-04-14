# =============================================================================
# Skill Swap Hub - Flask Web Application
# =============================================================================
# This is a complete web application for sharing skills and resources
# It includes user registration, login, resource sharing, and more
# =============================================================================

# Import the Flask library and other needed modules
from flask import (
    Flask,          # Main Flask class for the web app
    render_template,  # Function to render HTML templates
    request,         # Object to handle incoming requests
    redirect,         # Function to redirect to other pages
    url_for,         # Function to create URLs for routes
    session,          # Object to store user session data
    flash             # Function to show messages to users
)
from pymongo import MongoClient  # Library to connect to MongoDB database
from werkzeug.security import generate_password_hash, check_password_hash  # For password security
from werkzeug.utils import secure_filename  # For secure file uploads
from datetime import datetime  # For timestamps
import os  # For working with files and directories

# =============================================================================
# APP CONFIGURATION
# =============================================================================
# Set up the Flask application and basic settings

app = Flask(__name__)
# Secret key for session security - change this in production!
# Generate a new one with: python -c "import secrets; print(secrets.token_hex(32))"
app.secret_key = "change-this-to-a-random-secret-key"

# MongoDB database connection details
MONGO_URI = "mongodb+srv://Cbotty:Pass1234@cluster0.3ffc7jf.mongodb.net/?appName=Cluster0"
DB_NAME = "skillswap_db"

# File upload settings
UPLOAD_FOLDER = os.path.join("static", "uploads")  # Where to save uploaded files
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}  # Allowed image types
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Create the upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# =============================================================================
# DATABASE CONNECTION
# =============================================================================
# Connect to MongoDB Atlas and set up collections
# Collections are like tables in SQL databases

try:
    # Connect to the MongoDB database
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    # Create collections for different types of data
    users_collection = db["users"]           # Store user accounts
    resources_collection = db["resources"]     # Store learning resources
    comments_collection = db["comments"]       # Store user comments
    bookmarks_collection = db["bookmarks"]     # Store user bookmarks
    skill_requests_collection = db["skill_requests"]  # Store skill requests
    
    # Test the connection
    client.admin.command("ping")
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    print("Please check your MONGO_URI in app.py")


# =============================================================================
# HELPER FUNCTIONS
# =============================================================================
# These functions help us avoid repeating code

def allowed_file(filename):
    """
    Check if the uploaded file has an allowed extension
    
    Args:
        filename: The name of the uploaded file
        
    Returns:
        True if file is allowed, False otherwise
    """
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_logged_in_user():
    """
    Get the current user from the session
    
    Returns:
        User data from database if logged in, None if not
    """
    if "username" in session:
        try:
            user = users_collection.find_one({"username": session["username"]})
            return user
        except Exception as e:
            print(f"Error fetching user: {e}")
            return None
    return None


# =============================================================================
# ERROR HANDLERS
# =============================================================================
# Custom error pages for better user experience

@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 server errors
    
    Args:
        error: The error that occurred
        
    Returns:
        Custom error page with 500 status
    """
    return render_template("error500.html"), 500


# =============================================================================
# CUSTOM ERROR HANDLERS
# =============================================================================
# Centralized error handling for better user experience
# Provides custom error pages instead of default Flask errors
# =============================================================================

@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 Internal Server Error.
    
    Args:
        error: The error object from Flask
        
    Returns:
        tuple: Custom 500 error page with HTTP status code
        
    Purpose:
        Provides user-friendly error page for server errors
        Logs the error for debugging
    """
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

@app.errorhandler(404)
def not_found(error):
    """Handle 404 Not Found error with a custom page."""
    return render_template("error404.html"), 404


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
        
        # Add comments and ratings data to each resource
        for resource in resources:
            # Get comments for this resource
            resource_comments = list(
                comments_collection.find({"resource_id": str(resource["_id"])})
                .sort("created_at", -1)
            )
            resource["comments"] = resource_comments
            
            # Calculate average rating
            ratings = resource.get("ratings", [])
            if ratings:
                total_rating = sum(r["rating"] for r in ratings)
                resource["average_rating"] = total_rating / len(ratings)
                resource["rating_count"] = len(ratings)
            else:
                resource["average_rating"] = 0
                resource["rating_count"] = 0

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


@app.route("/about")
def about():
    """Display the about page with platform information."""
    user = get_logged_in_user()
    return render_template("about.html", user=user)


@app.route("/contact")
def contact():
    """Display the contact page."""
    user = get_logged_in_user()
    return render_template("contact.html", user=user)


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


# --- Interactive Feedback System ----------------------------------------------

@app.route("/rate_resource/<resource_id>", methods=["POST"])
def rate_resource(resource_id):
    """
    Handle resource rating/upvoting functionality.
    Updates the resource document with user ratings.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to rate resources.", "error")
        return redirect(url_for("login"))

    try:
        rating = int(request.form.get("rating", 1))
        if rating < 1 or rating > 5:
            flash("Rating must be between 1 and 5.", "error")
            return redirect(url_for("timeline"))

        # Update resource with new rating
        resources_collection.update_one(
            {"_id": resource_id},
            {
                "$push": {
                    "ratings": {
                        "user": user["username"],
                        "rating": rating,
                        "created_at": datetime.now()
                    }
                },
                "$inc": {"rating_count": 1, "rating_total": rating}
            }
        )
        flash("Thank you for rating this resource!", "success")
    except Exception as e:
        flash(f"Failed to rate resource: {e}", "error")

    return redirect(url_for("timeline"))


@app.route("/add_comment/<resource_id>", methods=["POST"])
def add_comment(resource_id):
    """
    Handle comment submission for resources.
    Stores comments in the comments collection.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to add comments.", "error")
        return redirect(url_for("login"))

    comment_text = request.form.get("comment", "").strip()
    if not comment_text:
        flash("Comment cannot be empty.", "error")
        return redirect(url_for("timeline"))

    if len(comment_text) > 500:
        flash("Comment must be 500 characters or fewer.", "error")
        return redirect(url_for("timeline"))

    try:
        comment_doc = {
            "resource_id": resource_id,
            "user": user["username"],
            "user_photo": user.get("profile_photo", "uploads/placeholder.png"),
            "comment": comment_text,
            "created_at": datetime.now()
        }
        comments_collection.insert_one(comment_doc)
        flash("Comment added successfully!", "success")
    except Exception as e:
        flash(f"Failed to add comment: {e}", "error")

    return redirect(url_for("timeline"))


# --- Advanced Features: Bookmarking -----------------------------------------

@app.route("/bookmark_resource/<resource_id>", methods=["POST"])
def bookmark_resource(resource_id):
    """
    Allow users to bookmark/save resources for later reference.
    Stores bookmarked resource IDs in the user's document.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to bookmark resources.", "error")
        return redirect(url_for("login"))

    try:
        # Check if already bookmarked
        if "bookmarked_resources" not in user:
            user["bookmarked_resources"] = []

        if resource_id in user["bookmarked_resources"]:
            flash("Resource already bookmarked.", "info")
        else:
            users_collection.update_one(
                {"username": user["username"]},
                {"$push": {"bookmarked_resources": resource_id}}
            )
            flash("Resource bookmarked successfully!", "success")
    except Exception as e:
        flash(f"Failed to bookmark resource: {e}", "error")

    return redirect(url_for("timeline"))


@app.route("/bookmarks")
def bookmarks():
    """
    Display user's bookmarked resources.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to view your bookmarks.", "error")
        return redirect(url_for("login"))

    try:
        bookmarked_ids = user.get("bookmarked_resources", [])
        if bookmarked_ids:
            bookmarked_resources = list(
                resources_collection.find({"_id": {"$in": bookmarked_ids}})
                .sort("created_at", -1)
            )
        else:
            bookmarked_resources = []
    except Exception as e:
        flash(f"Could not load bookmarks: {e}", "error")
        bookmarked_resources = []

    return render_template("bookmarks.html", user=user, resources=bookmarked_resources)


# --- Advanced Features: AI-Powered Recommendations ---------------------------

@app.route("/recommendations")
def recommendations():
    """
    Display AI-powered resource recommendations based on user's hobbies and popular resources.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to view recommendations.", "error")
        return redirect(url_for("login"))

    try:
        # Get user's hobbies for personalized recommendations
        user_hobbies = user.get("hobbies", "").lower().split(",") if user.get("hobbies") else []
        
        # Get most popular resources (high rating_count)
        popular_resources = list(
            resources_collection.find({"rating_count": {"$gt": 0}})
            .sort("rating_total", -1)
            .limit(5)
        )

        # Get AI Tools category resources
        ai_tools = list(
            resources_collection.find({"category": "AI Tools"})
            .sort("created_at", -1)
            .limit(3)
        )

        # Get resources matching user's hobbies
        hobby_recommendations = []
        if user_hobbies:
            hobby_query = {
                "$or": [
                    {"category": {"$regex": hobby, "$options": "i"}},
                    {"title": {"$regex": hobby, "$options": "i"}},
                    {"description": {"$regex": hobby, "$options": "i"}}
                ] for hobby in user_hobbies if hobby.strip()
            }
            hobby_recommendations = list(
                resources_collection.find(hobby_query)
                .sort("rating_total", -1)
                .limit(5)
            )

    except Exception as e:
        flash(f"Could not load recommendations: {e}", "error")
        popular_resources = []
        ai_tools = []
        hobby_recommendations = []

    return render_template(
        "recommendations.html",
        user=user,
        popular_resources=popular_resources,
        ai_tools=ai_tools,
        hobby_recommendations=hobby_recommendations
    )


# --- Advanced Features: Skill Requests and Voting ----------------------------

@app.route("/request_skill", methods=["GET", "POST"])
def request_skill():
    """
    Allow users to request skills they want to learn.
    Other users can vote on these requests.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to request skills.", "error")
        return redirect(url_for("login"))

    if request.method == "POST":
        skill_title = request.form.get("skill_title", "").strip()
        skill_description = request.form.get("skill_description", "").strip()
        category = request.form.get("category", "").strip()

        if not skill_title or not skill_description:
            flash("Skill title and description are required.", "error")
            return redirect(url_for("request_skill"))

        if len(skill_title) > 100:
            flash("Skill title must be 100 characters or fewer.", "error")
            return redirect(url_for("request_skill"))

        try:
            request_doc = {
                "title": skill_title,
                "description": skill_description,
                "category": category,
                "requester": user["username"],
                "votes": 1,  # Requester automatically votes
                "voters": [user["username"]],
                "created_at": datetime.now()
            }
            skill_requests_collection.insert_one(request_doc)
            flash("Skill request submitted successfully!", "success")
            return redirect(url_for("skill_requests"))
        except Exception as e:
            flash(f"Failed to submit skill request: {e}", "error")

    return render_template("request_skill.html", user=user)


@app.route("/skill_requests")
def skill_requests():
    """
    Display all skill requests with voting functionality.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to view skill requests.", "error")
        return redirect(url_for("login"))

    try:
        requests = list(
            skill_requests_collection.find()
            .sort("votes", -1)
            .sort("created_at", -1)
        )
    except Exception as e:
        flash(f"Could not load skill requests: {e}", "error")
        requests = []

    categories = [
        "Programming", "Design", "Music", "Photography",
        "Languages", "Cooking", "Fitness", "AI Tools", "Other"
    ]

    return render_template("skill_requests.html", user=user, requests=requests, categories=categories)


@app.route("/vote_skill_request/<request_id>", methods=["POST"])
def vote_skill_request(request_id):
    """
    Handle voting on skill requests.
    """
    user = get_logged_in_user()
    if not user:
        flash("Please log in to vote on skill requests.", "error")
        return redirect(url_for("login"))

    try:
        skill_request = skill_requests_collection.find_one({"_id": request_id})
        if not skill_request:
            flash("Skill request not found.", "error")
            return redirect(url_for("skill_requests"))

        # Check if user already voted
        if user["username"] in skill_request.get("voters", []):
            flash("You have already voted on this request.", "info")
        else:
            skill_requests_collection.update_one(
                {"_id": request_id},
                {
                    "$inc": {"votes": 1},
                    "$push": {"voters": user["username"]}
                }
            )
            flash("Vote submitted successfully!", "success")
    except Exception as e:
        flash(f"Failed to vote: {e}", "error")

    return redirect(url_for("skill_requests"))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
