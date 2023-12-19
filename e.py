import requests
import xlwt
from xlwt import Workbook
import smtplib
from os.path import basename

from bs4 import BeautifulSoup

search=input()
search=search.replace(" ","+")
url =f"https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw={search}&_sacat=0&_odkw=hp&_osacat=0"
response = requests.get(url)

if response.status_code==200:
    soup=BeautifulSoup(response.text,'html.parser')
    cards=soup.body.find_all(class_="s-item__wrapper clearfix")
    for i in range(1,len(cards)):
        links=cards[i].find_all(class_="s-item__link")
        for link in links:
            href = link.get('href')
            print(href)
        title=cards[i].find_all('div',class_="s-item__title")
        print(title[0].text)
        price=cards[i].find_all(class_="s-item__price")
        print(price[0].text)
    
else:
    print("Failed to fetch the webpage")
