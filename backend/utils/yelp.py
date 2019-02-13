from bs4 import BeautifulSoup
import requests 
from collections import namedtuple
import random
import json

yelp_review = namedtuple('review', ['yelp_rating', 'model_rating', 'text'])
yelp_biz = namedtuple('yelp_biz', ['name', 'yelp_rating', 'review_rating', 'model_rating', 'reviews'])


def transform_yelp_rating(rating: str) -> float:
    return float(rating.split(' ')[0])

def translate_model_rating(rating: str) -> float:
    return float(rating.data) + 1.

def model_rating(model, text: str) -> float:
    cat, _, t = model.predict(text)
        
    return translate_model_rating(cat)

def scrape_yelp_biz(url: str, model) -> yelp_biz:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    
    reviews = []
    biz_name = soup.find('div', {'class': 'biz-page-header-left'}).find('h1', {'class':'biz-page-title'}).text.strip()
    biz_rating = transform_yelp_rating(soup.find('div', {'class': 'biz-rating'}).find('div', {'class':'i-stars'}).get('title'))

    for review in soup.find_all(class_='review-content'):
        text = review.find('p').text
        rating = transform_yelp_rating(review.find('div', {'class':'i-stars'}).get('title'))
#         predicted_rating = model_rating(model, text)  # TODO: Pass the real model here when trained
        predicted_rating = random.randint(1, 5)
        reviews.extend([yelp_review(rating, predicted_rating, text)])

    review_rating = sum([r.yelp_rating for r in reviews])/len(reviews)
    predicted_model_rating = sum([r.model_rating for r in reviews])/len(reviews)
    
    return yelp_biz(biz_name, biz_rating, review_rating, predicted_rating, reviews)