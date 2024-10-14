from locust import HttpUser, task
import random

words = [
    "cat",
    "dog",
    "bird",
    "fish",
    "monkey",
    "elephant",
    "tiger",
    "lion",
    "zebra",
]

class TestUser(HttpUser):
    @task
    def test_api(self):
        self.client.get("https://fetchpix.one/")
        for word in words:
            self.client.get(f"https://fetchpix.one/?q={word}")

    def on_start(self):
        self.client.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        })
    
    def on_stop(self):
        self.client.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        })

    def on_error(self, e):
        print(f"Error: {e}")

    def on_error_report(self, e):
        print(f"Error: {e}")
