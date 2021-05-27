from selenium import webdriver
from bs4 import BeautifulSoup as soups
import pymysql.cursors

#connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

def search_selenium(search_name, index) :
    search_url = "https://www.google.com/search?q=" + str(search_name) + "&hl=ko&tbm=isch"
    
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    browser = webdriver.Chrome(executable_path = 'C:/chromedriver_win32/chromedriver.exe', options = options)
    browser.get(search_url)
    
    #image_count = len(browser.find_elements_by_tag_name("img"))
    
    #print("로드된 이미지 개수 : ", image_count)
 
    browser.implicitly_wait(5)

    #image = browser.find_elements_by_tag_name("img")[10]

    image = browser.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div[1]/div[1]/div[1]/div[2]/a[1]/div[1]/img')
    #urllib.request.urlretrieve(imgUrl, "D:/Crawling_images/" + str(search_name) + ".jpg")
    base64string = image.get_attribute('src')

    try:
        base64string = base64string.split(',')[1]

        connection = pymysql.connect(host='k4d101.p.ssafy.io',port=3306,user="ssafy",password="ssafy",db="ssg", cursorclass=pymysql.cursors.DictCursor)

        with connection.cursor() as cursor:
           sql = "INSERT INTO product_image(prod_name,image) VALUES (%s,%s)"
           values = (str(search_name),base64string)
           cursor.execute(sql, values)
           connection.commit()
    
        connection.close()

        print(index, "     done!")

        browser.close()

    except:
        f = open('new.txt', 'a')
        f.write(search_name)
        f.close()
 
    
 
if __name__ == "__main__" :
 
	f = open('except.txt', 'r', encoding='UTF-8')
	line = f.readline()
	index = 1

	while line:
	#for i in range(3):
		if index >= 19:
			search_selenium(line,index)
			line = f.readline()
			index = index + 1

		else :
			line = f.readline()
			index = index + 1
	f.close()