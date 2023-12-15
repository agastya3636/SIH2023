from bs4 import BeautifulSoup
import requests
import json,jsonify
from flask import Flask, request
app = Flask(__name__)


# def run_script():
#     if request.method == 'POST':
#         value = request.form["d"]

#         url=value
#         response = requests.get(url)
#         featuredictionary={}
#         itemdetails=""
#         if response.status_code == 200:
#             soup = BeautifulSoup(response.text, 'html.parser')
#             itemdetails = soup.body.find_all('div', class_='page_bg')
#             #variant_desc_divs = soup.body.find_all('div', class_='variant-wrapper')
#             #print(itemdetails)

#             #function to extract title
#             for div in itemdetails:
#                 titles=div.find_all('h1',class_='like-h3')
#                 for title in titles:
#                         title_text = title.contents[0].strip() if title.contents else ""
#                         brand=title.find_all('span',class_="brand-name")
#                         model=title.find_all('span',class_="model")
#                         #print(title_text)
#                         #print(brand[0].text)
#                         #print(model[0].text)
#                         featuredictionary['name']=title_text
#                         featuredictionary['brand']=brand[0].text.strip()
#                         featuredictionary['model']=model[0].text.strip()
#                 #product details
#                 pdetails=div.find_all('div',class_="product-details")
#                 for product in pdetails:
#                     #product quantity available
#                     instock=product.find_all('span',class_="pdp-availability")
#                     #this shortcut
#                     #print(product.find_all('strong',class_="green"))
#                     for i in instock:
#                         stocka=i.find_all('strong',class_="green")
#                         #print(stocka[0].text.strip().replace('\n',' '))
#                         featuredictionary['in stock']=stocka[0].text.strip().replace('\n',' ')
#                     #Min Quantity per consignee:
#                     minq=product.find_all('span',class_="moq_data")
#                     #print(minq[0].text)
#                     featuredictionary['minimum quantity']=minq[0].text.strip()
                    
#                     productid=product.find_all('span',class_="item_sku")
#                     #print(productid[0].text)
#                     featuredictionary['product id']=productid[0].text.strip()
                    
#                     origin=product.find_all('span',class_="origin_country_data")
#                     #print(origin[0].text)
#                     featuredictionary['origin']=origin[0].text.strip()
                    
#                     price=product.find_all('span',class_="m-w")
#                     #print(price[0].text)
#                     featuredictionary['price']=price[0].text.strip()
                    
#                     mit=product.find_all('span',class_="mii_percentage_data")
#                     #print(mit[0].text)
#                     featuredictionary['mit']=mit[0].text.strip()
                    
#                     pricefor=product.find_all('div',class_="pdp-qty-message")
#                     #print(pricefor[0].text.strip().replace('\n',' '))
#                     featuredictionary['pricefor']=pricefor[0].text.strip().replace('\n',' ')
                    
#                 sellerdetails=div.find_all('div',class_='seller-details')
#                 #print (sellerdetails)
#                 for detail in sellerdetails:
#                     sellertype=detail.find_all('span',class_='sold_as_summary')
#                     #print(sellertype[0].text.strip())
#                     featuredictionary['sellertype']=sellertype[0].text.strip()
                    
#                     verificationstatus=detail.find_all('div', class_="seller-verified-status")
#                     #print(verificationstatus[0].text.strip())
#                     featuredictionary['verificationstatus']=verificationstatus[0].text.strip()
                    
#                     rating=detail.find_all('span',class_="badge")
#                     #print(rating[0].text.strip())
#                     featuredictionary['rating']=rating[0].text.strip()
                    
#                     sellerslink=detail.find_all('a',class_="sellers_summary")
#                     #print('https://mkp.gem.gov.in/'+sellerslink[0].get('href'))
#                     featuredictionary['sellerslink']='https://mkp.gem.gov.in/'+sellerslink[0].get('href')
                    
#                 images=div.find_all('img')
#                 for image in images:
#                     im=image.get('src')
#                     #print(im)
#                     featuredictionary['img']=im
                
#                 #specifications=div.find_all('div',class_='product-incidence')
#             #specification=div.find_all('div',class_='param-container')
#                 #d={}
#                 #for s in specification:
#                 #   key=s.find_all('span',class_='key_name')[0].text.strip()
#                 #  value=s.find_all('span',class_='key_value')[0].text.strip()
#                 # d[key]=value
#                 #print(d)
#             features = soup.body.find_all('div', id='feature_groups')
#             #print(features)
#             row=features[0].find_all('tr')
            
#             for r in row:
#                 data=r.find_all('td')
#                 featuredictionary[data[0].text.strip()]=(data[1].text.strip())
#             #print(featuredictionary)
#             #for i in featuredictionary:
#                 #print( i)
#                 #print(featuredictionary[i])
#             json_data = json.dumps(featuredictionary)
                        
            
        
#         if json_data:
#             return f"Received value: {json_data}"
#         return "r"
#     else:
#         return "Method not allowed"

# def extract_title(div, featuredictionary):
#     titles = div.find_all('h1', class_='like-h3')
#     for title in titles:
#         title_text = title.contents[0].strip() if title.contents else ""
#         brand = title.find_all('span', class_="brand-name")
#         model = title.find_all('span', class_="model")
#         featuredictionary['name'] = title_text
#         featuredictionary['brand'] = brand[0].text.strip()
#         featuredictionary['model'] = model[0].text.strip()

def extract_product_details(div, featuredictionary):
    pdetails=div.find_all('div',class_="product-details")
    for product in pdetails:
        #product quantity available
        instock=product.find_all('span',class_="pdp-availability")
        #this shortcut
        #print(product.find_all('strong',class_="green"))
        for i in instock:
            stocka=i.find_all('strong',class_="green")
            #print(stocka[0].text.strip().replace('\n',' '))
            featuredictionary['in stock']=stocka[0].text.strip().replace('\n',' ')
        #Min Quantity per consignee:
        minq=product.find_all('span',class_="moq_data")
        #print(minq[0].text)
        featuredictionary['minimum quantity']=minq[0].text.strip()
        
        productid=product.find_all('span',class_="item_sku")
        #print(productid[0].text)
        featuredictionary['product id']=productid[0].text.strip()
        
        origin=product.find_all('span',class_="origin_country_data")
        #print(origin[0].text)
        featuredictionary['origin']=origin[0].text.strip()
        
        price=product.find_all('span',class_="m-w")
        #print(price[0].text)
        featuredictionary['price']=price[0].text.strip()
        
        mit=product.find_all('span',class_="mii_percentage_data")
        #print(mit[0].text)
        featuredictionary['mit']=mit[0].text.strip()
        
        pricefor=product.find_all('div',class_="pdp-qty-message")
        #print(pricefor[0].text.strip().replace('\n',' '))
        featuredictionary['pricefor']=pricefor[0].text.strip().replace('\n',' ')

# def extract_seller_details(div, featuredictionary):
#     sellerdetails = div.find_all('div', class_='seller-details')
#     for detail in sellerdetails:
#         sellertype = detail.find_all('span', class_='sold_as_summary')
#         featuredictionary['sellertype']=sellertype[0].text.strip().replace('\n',' ')
        
#         # Extract seller details and update featuredictionary...

def extract_images(div, featuredictionary):
    images = div.find_all('img')
    for image in images:
        im = image.get('src')
        featuredictionary['img'] = im

def extract_features(soup, featuredictionary):
    features = soup.body.find_all('div', id='feature_groups')
    row = features[0].find_all('tr')
    
    for r in row:
        data = r.find_all('td')
        featuredictionary[data[0].text.strip()] = data[1].text.strip()




#gemscraper
def gem_scraper(url):
    
    response = requests.get(url)
    featuredictionary={}
    itemdetails=""
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        itemdetails = soup.body.find_all('div', class_='page_bg')
        #function to extract title
        for div in itemdetails:
            titles=div.find_all('h1',class_='like-h3')
            for title in titles:
                    title_text = title.contents[0].strip() if title.contents else ""
                    brand=title.find_all('span',class_="brand-name")
                    model=title.find_all('span',class_="model")
                    featuredictionary['name']=title_text
                    featuredictionary['brand']=brand[0].text.strip()
                    featuredictionary['model']=model[0].text.strip()
            #product details
            extract_product_details(div,featuredictionary)
                
            sellerdetails=div.find_all('div',class_='seller-details')
            #print (sellerdetails)
            for detail in sellerdetails:
                sellertype=detail.find_all('span',class_='sold_as_summary')
                #print(sellertype[0].text.strip())
                featuredictionary['sellertype']=sellertype[0].text.strip()
                
                verificationstatus=detail.find_all('div', class_="seller-verified-status")
                #print(verificationstatus[0].text.strip())
                featuredictionary['verificationstatus']=verificationstatus[0].text.strip()
                
                rating=detail.find_all('span',class_="badge")
                #print(rating[0].text.strip())
                featuredictionary['rating']=rating[0].text.strip()
                
                sellerslink=detail.find_all('a')
                #print(sellerslink)
                #print('https://mkp.gem.gov.in/'+sellerslink[0].get('href'))
                featuredictionary['sellerslink']='https://mkp.gem.gov.in/'+sellerslink[0].get('href')
                
            extract_images(div,featuredictionary)
        extract_features(soup,featuredictionary)
        json_data = json.dumps(featuredictionary,indent=2)
        return(json_data)
    else:
        print("Failed to fetch the webpage")

#amazonscraper
def amazon_scraper(url):
    response = requests.get(url)
    if response.status_code==200:
        soup=BeautifulSoup(response.text,'html.parser')
        #print(soup.prettify())
        d={}
        title= soup.body.find_all('span', id='productTitle')
        d['title']=(title[0].text.strip())
        price = soup.body.find_all('span', class_='a-price')
        d['price']=(price[0].find('span',class_='a-offscreen').text.strip())
        div=soup.body.find_all('div',id='prodDetails')
        dep=div[0].find_all('tr')

        for i in dep:
            d[i.find('th').text.strip()]=i.find('td').text.strip().replace('\n',' ')
        #print(d)
        json_data = json.dumps(d,indent=2)
        return json_data
        
    else:
        print("Failed to fetch the webpage")
        
#flipkartscraper
def flipkart_scraper(url):
    response = requests.get(url)
    if response.status_code==200:
        soup=BeautifulSoup(response.text,'html.parser')
        #print(soup.prettify())
        d={}
        title= soup.body.find_all('span', class_='B_NuCI')
        d['title']=(title[0].text.strip())
        price = soup.body.find_all('div', class_='_30jeq3 _16Jk6d')
        d['price']=(price[0].text.strip())
        div=soup.body.find_all('div',class_='_1UhVsV')

        dep=div[0].find_all('tr')

        for i in dep:
            #print(i)
            d[i.find_all('td')[0].text.strip()]=i.find_all('td')[1].text.strip().replace('\n',' ')
        #print(d)
        json_data = json.dumps(d,indent=2)
        return json_data
        
    else:
        print("Failed to fetch the webpage")
    
@app.route('/run_script', methods=['POST'])
def run_script():
    url1 = request.form['value1']
    url2 = request.form['value2']
    url3 = request.form['value3']
    data={}
    if url1:
        data["GEM"] = json.loads(gem_scraper(url1))
    if url2:
        data["AMAZON"] = json.loads(amazon_scraper(url2))
    if url3:
        data["FLIPKART"] = json.loads(flipkart_scraper(url3))

    if data:
        return json.dumps(data,indent=2)
    
    return "No JSON data available."


if __name__ == '__main__':
    app.run(debug=True,port='5500')  # Change the port number (e.g., 5001)

