import requests
from bs4 import BeautifulSoup
import csv
from flask import Flask, request

app = Flask(__name__)


@app.route('/seller', methods=['POST'])
def run_script():
    try:
        url = "https://mkp.gem.gov.in/desktop-computers/cynix-intel-core-i5-10400-8-gb-500/p-5116877-79231568763-cat/all_sellers.html"
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            table = soup.body.find_all('div', id="sellers-table-wrap")
        
            heading = table[0].find_all('th')
            header = []
            for h in heading:
                header.append(str(h.text.strip()))
        
            tb = table[0].find_all('tbody')
            n = tb[0].find_all('div', class_="seller-info")
            p = tb[0].find_all('span', class_="variant-final-price")
            d = tb[0].find_all(class_="delivery-locations")
            q = tb[0].find_all(class_="quantity-based-discount")
            qa = tb[0].find_all(class_="quantity-available")
            minq = tb[0].find_all(class_="moq")
            ofp = tb[0].find_all(class_="offer-product")
            ori = tb[0].find_all(class_="country-of-origin")
        
            with open("seller_data.csv", "w", newline="", encoding="utf-8") as csvfile:
                csv_writer = csv.writer(csvfile)
                csv_writer.writerow(header)  # Write header row
        
                for i in range(0, len(n)):
                    data = [
                        n[i].text.strip().replace('\n', ' '),
                        p[i].text.strip(),
                        d[i].text.strip(),
                        q[i].text.strip(),
                        qa[i].text.strip(),
                        minq[i].text.strip(),
                        ofp[i].text.strip(),
                        ori[i].text.strip()
                    ]
                    csv_writer.writerow(data)
        
        else:
            print("ERROR")
    except Exception as e:
        return f"An error occurred: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True, port=6000)
