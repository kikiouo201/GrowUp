import dialogflow
import dialogflow_v2
# import json
from google.api_core.exceptions import InvalidArgument
from google.oauth2 import service_account
import speech_recognition as sr
import sys
import json
import time
import urllib.request as req
import urllib
import os

if os.name == 'nt':
    sys.stdout.reconfigure(encoding='utf-8')

#change to zh-TW
from opencc import OpenCC
cc = OpenCC('s2tw')
# print(cc.convert(search.p.text))

# sys.setdefaultencoding('utf8')    #python3已經設定UTF-8無須再設定

# from ..new_package_test import test
# tttest = "rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json"
# a = ..new_package_test 
# input_file = open('rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json')

DIALOGFLOW_PROJECT_ID = 'rasberry-20200203-hw-t1-smjjay' 
DIALOGFLOW_LANGUAGE_CODE = 'Chinese (Traditional) ??zh-TW'
GOOGLE_APPLICATION_CREDENTIALS = service_account.Credentials.from_service_account_file('rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json')
SESSION_ID = '7d8b5bc0c2044bb324ac0274f47aeb17ba184837'

#create a session client
session_client = dialogflow.SessionsClient(credentials=GOOGLE_APPLICATION_CREDENTIALS)
session = session_client.session_path(DIALOGFLOW_PROJECT_ID, SESSION_ID)
#print("client>>",end="")

#obtain audio from the microphone
r=sr.Recognizer()
with sr.Microphone() as source:
    waitStr = "Wait...coraporate Microphone..."
    # sys.stdout.reconfigure(encoding='utf-8')
    print(waitStr)
    #listen for 5 seconds and create the ambient noise energy level
    r.adjust_for_ambient_noise(source, duration=3) # turn 5s to 2s
    # sys.stdout.reconfigure(encoding='utf-8')
    speakHint = "Speak Now!"
    print(speakHint)
    audio=r.listen(source)
    thinkYouSaid = "Google Speech Recognition thinks you said:"
    print(thinkYouSaid)
    time.sleep(2)


# while 0:      #重複執行 1(或其他數字)==true(無限迴圈) / 0==false(直接不執行) 壞掉會一直問問題
    # sys.stdout.reconfigure(encoding='utf-8')
    
    print("You said>>",end = " ")
    # text_to_be_analyzed = input()
    # text_input = dialogflow.types.TextInput(text=text_to_be_analyzed, language_code=DIALOGFLOW_LANGUAGE_CODE)
    # query_input = dialogflow.types.QueryInput(text=text_input)

    speech_to_text=r.recognize_google(audio, language="zh-TW")
    text_input = dialogflow.types.TextInput(text=speech_to_text, language_code=DIALOGFLOW_LANGUAGE_CODE)
    query_input = dialogflow.types.QueryInput(text=text_input)
    # query_input = dialogflow.types.QueryInput(text=r.recognize_google(audio, language="zh-TW"))
   
    # print(type(r.recognize_google(audio, language="zh-TW")),end=" ")
    # sys.stdout.reconfigure(encoding='utf-8')
    print(speech_to_text)   #問題的中文
    

    try:
        response = session_client.detect_intent(session=session, query_input=query_input)
        # print("response = ? =>"+response)
        
        
    except InvalidArgument:
        raise
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("No response from Google Speech Recognition service: {0}".format(e))
    # sys.stdout.reconfigure(encoding='utf-8')
    print("chatbot>>", response.query_result.fulfillment_text)  #問題的答案



    result = {
    'Question': speech_to_text,
    'Answer': response.query_result.fulfillment_text,
    'Q_name': "",
    'Answer_pic':""
    }

    # sys.stdout.reconfigure(encoding='utf-8')
    print("sys="+sys.getdefaultencoding())
   
# sys.stdout.flush()
# print(result)   #{'Question': '', 'Answer': ''}
# print(result.Question)
# sys.stdout.reconfigure(encoding='utf-8')
print("data[Q]="+result['Question'])
# sys.stdout.reconfigure(encoding='utf-8')
# print("data[A]="+result['Answer'])

#######################################



codde=urllib.parse.quote(result['Answer'])
# print(codde)

#spider
# import urllib.request as req
# import urllib
url="https://zh.wikipedia.org/wiki/"+codde
#建立request物件
request=req.Request(url, headers={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
    
})

# keyword=req.Request(url, data={
#     "keyword":"蘋果"
# })

#讓request物件去打開url
with req.urlopen(request) as response :
    data=response.read().decode("utf-8")
# response = urllib.request.urlopen()
# print(data)

import bs4
soup=bs4.BeautifulSoup(data, "html.parser")
# print(soup.title)   #<title>首頁 - 文化部-兒童文化館</title>
search=soup.find("div", class_="mw-parser-output") #找查詢ㄉdiv
# findPic = pic.
# result = search.p.get('value')
# print(search.p.text) #這是簡中

#turn zh-TW
# print(cc.convert(search.p.text))
turnCC = cc.convert(search.p.text)
result['Answer'] = turnCC.strip()
# print(result)
print("data[A]="+str(result['Answer'])) #爬wiki的Answer
# print(result['Answer'])

#圖片名
Q_name = search.tr.text
# print("Q_name="+Q_name)
Q_name_CC = cc.convert(Q_name)
result['Q_name'] = Q_name_CC.strip()
# print("data[QName]="+result['Q_name'])


try:
    #爬圖片
    pic=soup.find("a",class_='image')
    img = pic.find_all('img')[0].get('src')
    # print(img)
    result['Answer_pic'] = img.strip()
    print('data[url]='+result['Answer_pic'])
except:
    print("Something went wrong, maybe this wiki Not found the img")




# JSON_A = json.dumps(result, ensure_ascii=False)
# data = json.loads(JSON_A)
# print(data)
# print("data[Q]="+data['Question'])
# print("data[A]="+data['Answer'])

# print("dic...?="+JSON_A)

sys.stdout.flush()
