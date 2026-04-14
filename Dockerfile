# =============================================================================
# Skill Swap Hub - Docker Configuration
# =============================================================================
# This Dockerfile creates a production-ready container for the Flask application
# Includes all dependencies, security best practices, and proper configuration
# =============================================================================

# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set environment variables for non-interactive installation
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create necessary directories with proper permissions
RUN mkdir -p static/uploads && \
    chmod 755 static/uploads

# Set up proper file permissions
RUN chmod -R 755 .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

# Expose Flask port
EXPOSE 5000

# Health check to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1

# Set environment variables for Flask
ENV FLASK_APP=app.py \
    FLASK_ENV=production

# Run the application with Gunicorn for production
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--timeout", "120", "app:app"]