"""
API Endpoints for Frontend Integration
Provides REST API endpoints for the React frontend to access admin-managed content
"""

from flask import Blueprint, jsonify, request
from src.models import db, Image, Category, SystemConfig
import os
from src.config import PHOTOGRAPHY_ASSETS_DIR

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/background-image', methods=['GET'])
def get_background_image():
    """Get the current background image for the homepage"""
    try:
        # Get the current background image from system config
        config = SystemConfig.query.filter_by(key='current_background').first()
        if not config:
            return jsonify({'error': 'No background image configured'}), 404
        
        # Get the image details
        image = Image.query.get(config.value)
        if not image:
            return jsonify({'error': 'Background image not found'}), 404
        
        return jsonify({
            'id': image.id,
            'filename': image.filename,
            'title': image.title,
            'description': image.description
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/api/portfolio', methods=['GET'])
def get_portfolio_images():
    """Get portfolio images with pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 12, type=int)
        category_id = request.args.get('category', None)
        
        # Base query
        query = Image.query
        
        # Filter by category if specified
        if category_id and category_id != 'all':
            query = query.join(Image.categories).filter(Category.id == category_id)
        
        # Paginate
        pagination = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        images = []
        for image in pagination.items:
            image_data = {
                'id': image.id,
                'filename': image.filename,
                'title': image.title,
                'description': image.description,
                'categories': [{'id': cat.id, 'name': cat.name} for cat in image.categories]
            }
            images.append(image_data)
        
        return jsonify({
            'images': images,
            'total': pagination.total,
            'pages': pagination.pages,
            'current_page': page,
            'per_page': per_page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all available categories"""
    try:
        categories = Category.query.all()
        return jsonify([
            {'id': cat.id, 'name': cat.name}
            for cat in categories
        ])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/api/about-content', methods=['GET'])
def get_about_content():
    """Get about page content"""
    try:
        # Try to get about content from system config
        config = SystemConfig.query.filter_by(key='about_content').first()
        if config:
            import json
            content = json.loads(config.value)
            return jsonify(content)
        else:
            # Return default content
            return jsonify({
                'title': 'About Mind\'s Eye Photography',
                'content': 'Welcome to Mind\'s Eye Photography, where we capture the world through a unique perspective.'
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api_bp.route('/api/about-image', methods=['GET'])
def get_about_image():
    """Get about page image"""
    try:
        # Get about image from system config
        config = SystemConfig.query.filter_by(key='about_image').first()
        if not config:
            return jsonify({'error': 'No about image configured'}), 404
        
        # Get the image details
        image = Image.query.get(config.value)
        if not image:
            return jsonify({'error': 'About image not found'}), 404
        
        return jsonify({
            'id': image.id,
            'filename': image.filename,
            'title': image.title,
            'description': image.description
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

