import os
import boto3
from botocore.exceptions import ClientError
from flask import Flask, render_template, send_from_directory, request
import time
import threading
app = Flask(__name__)

table_number = 1  # useless

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
sns = boto3.client('sns', region_name='us-east-1')
table = dynamodb.Table('hackthon-table')

@app.route('/')
def home():
    return render_template("index.html")


water_file_name = "left_water.txt"
class Water:
    def __init__(self):
        self.coda = 3000 # goto dynamo db
        self.origin_water = self.get_water()
    def get_water(self):
        f = open(water_file_name, "w+")
        lines = f.readlines()
        if len(lines):
            return int(lines[-1])
        else:
            return 0
    def left_coda(self):
        return self.coda - (self.origin_water - self.get_water())


uid_file_name = "scanned_uids.txt"
def clear_files():
    f = open(uid_file_name, "w")
    f.close()

water_info = Water()
erase_thread = threading.Thread()
def get_uid():
    global erase_thread
    f = open(uid_file_name, "r")
    lines = f.readlines()
    if len(lines):
        if not erase_thread.is_alive():
            water_info = Water()
            erase_thread = threading.Timer(5, clear_files)
            erase_thread.start()
        return lines[-1]
    else:
        return None



names ={
    "[61,84,4,114,31]": "陳磊恩"
}

@app.route('/get-section')
def get_section():
    uid = get_uid()
    if uid :
        name = names[uid]
        left_water = water_info.left_coda()
        data = {}
        data["headline"] =  "歡迎，" + name + "同學"
        data["left_water"] = f'{left_water:>4}' + "g";
        return render_template("monitor.html", data=data)
    else:
        return render_template("waiting.html")
    
   


items = [{'price': '15', 'foodname': 'strange food', 'weight': '120'}]


def items_str():
    res = ''
    sum = 0
    for item in items:
        res += item['foodname'] + '\t' + \
            item['weight'] + 'g\t' + \
            item['price'] + 'NTD\n'
        sum += int(item['price'])
    res += '\ntotal ' + str(sum) + 'NTD'
    return res




@app.route('/sns')
def publish_sns():
    sns.publish(TopicArn="",
                Message=items_str(),
                Subject="Bill Info")
    return render_template("success.html", data=items)


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('assets', path)


@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('images', path)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000')
