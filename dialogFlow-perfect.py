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
DIALOGFLOW_LANGUAGE_CODE = 'Chinese(Traditional) – zh-tw'
GOOGLE_APPLICATION_CREDENTIALS = service_account.Credentials.from_service_account_file('rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json')
SESSION_ID = '7d8b5bc0c2044bb324ac0274f47aeb17ba184837'

#create a session client
session_client = dialogflow.SessionsClient(credentials=GOOGLE_APPLICATION_CREDENTIALS)
session = session_client.session_path(DIALOGFLOW_PROJECT_ID, SESSION_ID)
#print("client>>",end="")

# text hint
waitStr = "Wait...coraporate Microphone..."
speakHint = "Speak Now!"

#obtain audio from the microphone
def speechRecognition():
    r=sr.Recognizer()
    with sr.Microphone() as source:
        # print(waitStr)
        #listen for 5 seconds and create the ambient noise energy level
        r.adjust_for_ambient_noise(source, duration=3) # turn 5s to 2s

        print(speakHint)
        audio=r.listen(source)
        thinkYouSaid = "Google Speech Recognition thinks you said:"
        print(thinkYouSaid)
        time.sleep(2)
        
        # print("You said>>",end = " ")
        # text_to_be_analyzed = input()
        # text_input = dialogflow.types.TextInput(text=text_to_be_analyzed, language_code=DIALOGFLOW_LANGUAGE_CODE)
        # query_input = dialogflow.types.QueryInput(text=text_input)

        speech_to_text=r.recognize_google(audio, language="zh-TW")
        text_input = dialogflow.types.TextInput(text=speech_to_text, language_code=DIALOGFLOW_LANGUAGE_CODE)
        query_input = dialogflow.types.QueryInput(text=text_input)
        # query_input = dialogflow.types.QueryInput(text=r.recognize_google(audio, language="zh-TW"))
    
        # print(type(r.recognize_google(audio, language="zh-TW")),end=" ")
        # sys.stdout.reconfigure(encoding='utf-8')
        # print(speech_to_text)   #問題的中文
        

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
        answer_keyWord = response.query_result.fulfillment_text
        # print("chatbot>>", response.query_result.fulfillment_text)  #問題的答案

        result = {
        "Question": speech_to_text,
        "Answer": response.query_result.fulfillment_text,
        "Answer_pic":"",
        "keyWord":response.query_result.fulfillment_text,
        # 
        "qVoice":"",
        "aVoice":""
        }
        # print("data[Q]="+result['Question'])
        # print("result="+data)
        print(json.dumps(result))
        # print("result:"+data)


    

    dictionary_keyword = {
        '蘋果' : '落業喬木。葉軟形，邊緣有細尖鋸齒。果實球形，味美，可食，也可製酒。',
        '西瓜' : '植物名。葫蘆科西瓜屬，一年生蔓草。果肉通常為紅色或黃色，水分多，味甜。', 
        '香蕉' :'植物名。芭蕉科芭蕉屬，多年生草本。莖短，葉長而寬，夏秋間自偽莖抽出大花軸，上部為雄花，下部為雌花，花色淡黃。果實為長形，稍彎，味香甜，亦稱為「香蕉」。',
        '螢幕' :'用來顯影的映像管表面，為電視、示波器、電腦的顯示部分。', 
        '椅子' :'供人坐臥的器具。', 
        '水壺' :'裝水的器具。', 
        '筆' :'寫字、畫圖的用具。',
        '筆記本' :'是一種多用途的文具，可用作記事、寫作、繪畫、便條及掃描等用途，也是採訪記者的職業日用品。', 
        '滑鼠' :'一種用於電腦繪圖的指示器。',
        '人' :'具有高度智慧和靈性，且能製造並使用工具以進行勞動的高等動物。' , 
        '筆電' :'一種方便攜帶的輕量小型電腦，通常重一至三公斤。',
        '手錶' :'一種方便攜帶的輕量小型電腦，通常重一至三公斤。' ,
        '眼鏡' :'用玻璃片或水晶片製成，戴在眼睛前，以矯正視力或遮阻強烈光線、風沙的器具。' 
    }


speechRecognition()
    # sys.stdout.reconfigure(encoding='utf-8')
    # print("sys="+sys.getdefaultencoding())
    
def crawer():
    codde=urllib.parse.quote(result['Answer'])
    print(codde)



    # 關鍵字去爬維基的圖片
    url="https://zh.wikipedia.org/wiki/"+codde
    #建立request物件
    request=req.Request(url, headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
        
    })
    #讓request物件去打開url
    with req.urlopen(request) as response :
        data=response.read().decode("utf-8")
    import bs4
    soup=bs4.BeautifulSoup(data, "html.parser")
    search=soup.find("div", class_="mw-parser-output") #找查詢ㄉdiv
    # 爬蟲的解釋
    turnCC = cc.convert(search.p.text)  #變繁中
    result['Answer'] = turnCC.strip()
    # print(result)

    for key in dictionary_keyword.keys():
            # print('keyword -> '+key)  輸出key值
            # print('answer_keyword -> '+answer_keyWord)    #check 關鍵字是什麼
        if answer_keyWord == key :
            print('Correct on dic -> '+answer_keyWord)
            result['Answer'] = dictionary_keyword[key]
            break

    print("data[A]="+str(result['Answer'])) #輸出Answer
    # print(result['Answer'])

    #圖片名
    Q_name = search.tr.text
    # print("Q_name="+Q_name)
    Q_name_CC = cc.convert(Q_name)
    result['Q_name'] = Q_name_CC.strip()
    # print("data[QName]="+result['Q_name'])


    try:
        #爬圖片
        pic=soup.find("table",class_='infobox')
        img = pic.find_all('img')[0].get('src')
        # print(img)
        result['Answer_pic'] = img.strip()
        print('data[url]='+result['Answer_pic'])
        print('=data[keyWord]='+result['keyWord'])
    except:
        print("Something went wrong, maybe this wiki Not found the img")




    # JSON_A = json.dumps(result, ensure_ascii=False)
    # data = json.loads(JSON_A)
    # print(data)
    # print("data[Q]="+data['Question'])
    # print("data[A]="+data['Answer'])

    # print("dic...?="+JSON_A)

sys.stdout.flush()
