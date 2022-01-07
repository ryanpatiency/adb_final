import os
from flask import Flask, render_template, send_from_directory, request
import time
import threading

app = Flask(__name__)

table_number = 1  # useless


@app.route("/")
def home():
    return render_template("index.html")


def clear_files():
    pass


erase_thread = threading.Thread()


def get_uid():
    global erase_thread
    if not erase_thread.is_alive():
        erase_thread = threading.Timer(5, clear_files)
        erase_thread.start()


names = {"[61,84,4,114,31]": "陳磊恩"}


@app.route("/get-query-html")
def get_query():
    return render_template("query.html")
    #     return render_template("monitor.html", data=data)


@app.route("/query-data", methods=["POST"])
def query_data():
    print(request.form)
    return "[]"


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/login-info", methods=["POST"])
def login_info():
    print(request.form)
    return "[]"


items = [{"price": "15", "foodname": "strange food", "weight": "120"}]


def items_str():
    res = ""
    sum = 0
    for item in items:
        res += (
            item["foodname"] + "\t" + item["weight"] + "g\t" + item["price"] + "NTD\n"
        )
        sum += int(item["price"])
    res += "\ntotal " + str(sum) + "NTD"
    return res


@app.route("/sns")
def publish_sns():
    return render_template("success.html", data=items)


@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory("assets", path)


@app.route("/images/<path:path>")
def send_images(path):
    return send_from_directory("images", path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
