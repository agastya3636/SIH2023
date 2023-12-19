import requests
from bs4 import BeautifulSoup
import csv
from flask import Flask, request
import json
import pandas as pd
app = Flask(__name__)
headers= {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8", 
    "Accept-Encoding": "gzip, deflate, br", 
    "Accept-Language": "en-US,en", 
    "Host": "httpbin.org", 
    "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Brave\";v=\"120\"", 
    "Sec-Ch-Ua-Mobile": "?0", 
    "Sec-Ch-Ua-Platform": "\"Windows\"", 
    "Sec-Fetch-Dest": "document", 
    "Sec-Fetch-Mode": "navigate", 
    "Sec-Fetch-Site": "none", 
    "Sec-Fetch-User": "?1", 
    "Sec-Gpc": "1", 
    "Upgrade-Insecure-Requests": "1", 
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", 
    "X-Amzn-Trace-Id": "Root=1-65813eff-4444fd5d1290aa7641cf59d6"
  }

@app.route('/seller', methods=['POST'])
def run_script():
    try:
        data = request.get_json()  
        ls = data['array'] 
        url = ls[0]
        response = requests.get(url,headers=headers)
        
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
            data1=[]
            with open("seller_data.csv", "w", newline="", encoding="utf-8") as csvfile:
                csv_writer = csv.writer(csvfile)
                csv_writer.writerow(header)  # Write header row
        
                for i in range(0, len(n)):
                    
                    if(q[i].text=="\n"):
                        q[i]="N/A"
                    else:
                        q[i]=q[i].text.strip()
                    
                    data = [
                        n[i].text.strip().replace('\n', ' '),
                        p[i].text.strip(),
                        d[i].text.strip(),
                        q[i],
                        qa[i].text.strip(),
                        minq[i].text.strip(),
                        ofp[i].text.strip(),
                        ori[i].text.strip()
                    ]
                    csv_writer.writerow(data)
                    data1.append(data)
            excel_file = 'seller_data.xlsx' 
            df = pd.read_csv(csv_file)
            df.to_excel(excel_file, index=False)
        else:
            retu("ERROR")
    except Exception as e:
        return f"An error occurred: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True, port=6000)
