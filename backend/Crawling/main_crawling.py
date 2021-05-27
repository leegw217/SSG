import requests
from selenium import webdriver
from bs4 import BeautifulSoup
import re
import urllib3
import logging
import os
import time
from urllib.parse import urljoin
import pymysql.cursors
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

logger = logging.getLogger("logger")
stream = logging.StreamHandler()
formatter = logging.Formatter(
    '[%(asctime)s:%(levelname)s] %(message)s')
stream.setFormatter(formatter)
logger.addHandler(stream)
logger.setLevel(logging.INFO)
if not os.path.exists('./logs') or not os.path.isdir('./logs'):
    os.mkdir('./logs')
file_handler = logging.FileHandler(
    f'./logs/{int(time.time())}.log', encoding='utf-8')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

def scrap_event():
    logger.info('scrap event start')

    def scrap(cpage):
        url = 'https://emart24.co.kr/service/event.asp'
        return requests.post(url, data={'seq': '', 'cpage': cpage}, verify=False)
        
    column_names = ['small_image', 'event_name', 'event_term', 'big_image']

    def get_idx(element):
        s = re.findall(r"goPage\('([\d]+)'\)", element['href'])
        return int(s[0]) if s else 0

    def get_row(element):
        small_image = urljoin('https://emart24.co.kr', element.select_one('td:nth-child(2) > a > img')['src'])
        event_name = element.select_one('td:nth-child(3) > a').text.strip()
        event_term = element.select_one('td:nth-child(4)').text.strip()
        try:
            rep = requests.get(urljoin('https://emart24.co.kr/service/', element.select_one('td:nth-child(3) > a')['href']), verify=False)
            soup = BeautifulSoup(rep.text, 'html.parser')
            big_image = urljoin('https://emart24.co.kr', soup.select_one('img[usemap="#evtImage"]')['src'])
        except Exception:
            logger.exception('evtImage error')
            big_image = ''
        
        connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

        with connection.cursor() as cursor:
            sql = "INSERT INTO events(small_image,event_name,event_term,big_image) VALUES (%s,%s,%s,%s)"
            values = (small_image, event_name, event_term, big_image)
            cursor.execute(sql, values)
            connection.commit()

        connection.close()

        return [small_image, event_name, event_term, big_image]

    rep = scrap(1)
    soup = BeautifulSoup(rep.text, 'html.parser')
    max_idx = max(get_idx(i) for i in soup.select('.paging > a'))
    #result = []

    for i in range(1, max_idx + 1):
        logger.info(f'scrap event ({i}/{max_idx})')
        rep = scrap(i)
        soup = BeautifulSoup(rep.text, 'html.parser')
        page_result = [get_row(element) for element in soup.select('table.listTable > tbody > tr') if '진행중' in element.select_one('td:nth-child(5)').text]
        if len(page_result) == 0:
            break
    

def search_product(search_name) :
    search_url = "https://www.google.com/search?q=" + str(search_name) + "&hl=ko&tbm=isch"
    
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    browser = webdriver.Chrome(executable_path = 'C:/chromedriver_win32/chromedriver.exe', options = options)
    browser.get(search_url)
    
    browser.implicitly_wait(10)

    image = browser.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/div[2]/a[1]/div[1]/img')
    base64string = image.get_attribute('src')

    try:
        base64string = base64string.split(',')[1]

        browser.close()

        return base64string

    except:
        browser.close()

        return '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'


def scrap_rankingView():
    logger.info('start rankingView')
    def get_scrapper(rankId):
        rankId = int(rankId)
        grp_l_cds = {106: 'C101', 152: 'C102', 168: 'C108'}
        grp_m_cds = {106: 'C101002', 152: 'C102001', 168: 'C108001'}
        def scrap():
            url = 'https://m.emart24.co.kr/api/rank/dailyRankList'
            return requests.get(url, params={'rankId': rankId, 'grp_l_cd': grp_l_cds[rankId], 'grp_m_cd': grp_m_cds[rankId], 'pageCnt': 20}, verify=False)
        return scrap

    rankIds = [106, 152, 168]
    rankTable = {106: 'beer_ranking', 152: 'icecream_ranking', 168: 'snack_ranking'}
    scrappers = [[i, get_scrapper(i)] for i in rankIds]
    results = {}
    column_names = ['image', 'prod_name']

    def get_row(product):
        img = 'https://msave.emart24.co.kr/cmsbo/upload/nHq/plu_image/500x500/';
        if product['gdsImgId'] and product['maxFileSeq']:
            img = f'https://m.emart24.co.kr/file/download?id={product["gdsImgId"]}&seq={product["maxFileSeq"]}'
        else:
            img = img + product['gds_cd'] + '.JPG';

        return [img, product['gds_nm']]

    now = 1

    connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:

        for rankId, scrap in scrappers:
            logger.info(f'scrap rankingView ({now} / {len(scrappers)})')
            now += 1
            rep = scrap()
            json = rep.json()
            result = [get_row(product) for product in json['rankList'][:10]]
            
            if rankId == 106:
                for index in range(10):
                    img = search_product(result[index][1])
                    sql = "INSERT INTO beer_ranking(image,prod_name) VALUES (%s,%s)"
                    values = (img, result[index][1])
                    cursor.execute(sql, values)
                    connection.commit()

            elif rankId == 152:
                for index in range(10):
                    img = search_product(result[index][1])
                    sql = "INSERT INTO icecream_ranking(image,prod_name) VALUES (%s,%s)"
                    values = (img, result[index][1])
                    cursor.execute(sql, values)
                    connection.commit()

            elif rankId == 168:
                for index in range(10):
                    img = search_product(result[index][1])
                    sql = "INSERT INTO snack_ranking(image,prod_name) VALUES (%s,%s)"
                    values = (img, result[index][1])
                    cursor.execute(sql, values)
                    connection.commit()


    connection.close()


def scrap_eventProduct():
    logger.info('start eventProduct')
    def get_scrapper(productCategory):
        def scrap(cpage):
            url = 'https://emart24.co.kr/product/eventProduct.asp'
            return requests.post(url, data={'productCategory': productCategory, 'cpage': cpage}, verify=False)
        return scrap
    category = ['1n1', '2n1', '3n1', 'SALE', 'X2']
    scrappers = [[i, get_scrapper(i)] for i in category]
    results = {}
    column_names = ['image', 'prod_name', 'prod_price', 'cross_able']
    sale_column_names = ['image', 'prod_name', 'prod_original_price', 'prod_sale_price']
    dum_column_names = ['image', 'prod_name', 'dum_prod_name', 'prod_price']

    def get_idx(element):
        s = re.findall(r"goPage\('([\d]+)'\)", element['href'])
        return int(s[0]) if s else 0

    def get_row(category, element):
        if category == 'SALE':
            price_text = element.select_one('p.price').text.split('원')
            before_sale = int(''.join(re.findall('\d+', price_text[0])))
            after_sale = int(''.join(re.findall('\d+', price_text[1])))
            result = [urljoin('https://emart24.co.kr', element.select_one('p.productImg > img')['src']), element.select_one('p.productDiv').text, before_sale, after_sale]
            
            connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                sql = "INSERT INTO sale_product(image,prod_name,prod_original_price,prod_sale_price) VALUES (%s,%s,%s,%s)"
                values = (result[0], result[1], result[2], result[3])
                cursor.execute(sql, values)
                connection.commit()

            connection.close()

            return result

        elif category == 'X2':
            product_name = element.select_one('p.productDiv').text.split('_')
            result = [urljoin('https://emart24.co.kr', element.select_one('p.productImg > img')['src']), product_name[0], product_name[1],  int(''.join(re.findall('\d+', element.select_one('p.price').text)))]
            
            connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                sql = "INSERT INTO dum_product(image,prod_name,dum_prod_name,prod_price) VALUES (%s,%s,%s,%s)"
                values = (result[0], result[1], result[2], result[3])
                cursor.execute(sql, values)
                connection.commit()

            connection.close()

            return result

        elif category == '1n1':
            result = [urljoin('https://emart24.co.kr', element.select_one('p.productImg > img')['src']), element.select_one('p.productDiv').text,  int(''.join(re.findall('\d+', element.select_one('p.price').text))), 1 if '교차증정가능' in element.select_one('div.lable').text else 0]
        
            connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                sql = "INSERT INTO plus_one_product(type,image,prod_name,prod_price,cross_able) VALUES (%s,%s,%s,%s,%s)"
                values = (1, result[0], result[1], result[2], result[3])
                cursor.execute(sql, values)
                connection.commit()

            connection.close()

            return result


        elif category == '2n1':
            result = [urljoin('https://emart24.co.kr', element.select_one('p.productImg > img')['src']), element.select_one('p.productDiv').text,  int(''.join(re.findall('\d+', element.select_one('p.price').text))), 1 if '교차증정가능' in element.select_one('div.lable').text else 0]
        
            connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                sql = "INSERT INTO plus_one_product(type,image,prod_name,prod_price,cross_able) VALUES (%s,%s,%s,%s,%s)"
                values = (2, result[0], result[1], result[2], result[3])
                cursor.execute(sql, values)
                connection.commit()

            connection.close()

            return result

        elif category == '3n1':
            result = [urljoin('https://emart24.co.kr', element.select_one('p.productImg > img')['src']), element.select_one('p.productDiv').text,  int(''.join(re.findall('\d+', element.select_one('p.price').text))), 1 if '교차증정가능' in element.select_one('div.lable').text else 0]
        
            connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

            with connection.cursor() as cursor:
                sql = "INSERT INTO plus_one_product(type,image,prod_name,prod_price,cross_able) VALUES (%s,%s,%s,%s,%s)"
                values = (3, result[0], result[1], result[2], result[3])
                cursor.execute(sql, values)
                connection.commit()

            connection.close()

            return result


    for category, scrap in scrappers:
        rep = scrap(1)
        soup = BeautifulSoup(rep.text, 'html.parser')
        max_idx = max(get_idx(i) for i in soup.select('.paging > a'))
        result = []
        for i in range(1, max_idx + 1):
            logger.info(f'scrap eventProduct-{category} ({i}/{max_idx})')
            rep = scrap(i)
            soup = BeautifulSoup(rep.text, 'html.parser')
            result += [get_row(category, element) for element in soup.select('ul.categoryListNew > li')]
        
        
def scrap_all():

    connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
        sql = "DELETE from events;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table events auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        sql = "DELETE from dum_product;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table dum_product auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        sql = "DELETE from plus_one_product;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table plus_one_product auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        sql = "DELETE from sale_product;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table sale_product auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        '''
        sql = "DELETE from beer_ranking;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table beer_ranking auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        sql = "DELETE from icecream_ranking;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table icecream_ranking auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        sql = "DELETE from snack_ranking;"
        cursor.execute(sql)
        connection.commit()
        sql = "alter table snack_ranking auto_increment = 1"
        cursor.execute(sql)
        connection.commit()
        '''

    connection.close()
    
    try:
        scrap_event()
        scrap_eventProduct()
        #scrap_rankingView()

    except Exception:
        logger.exception('처리되지 않은 에러 발생')
        
def main():
    scrap_all()

if __name__ == '__main__':
    main()