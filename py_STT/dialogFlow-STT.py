import dialogflow
# import json
from google.api_core.exceptions import InvalidArgument
from google.oauth2 import service_account
import speech_recognition as sr

# from ..new_package_test import test
# tttest = "rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json"
# a = ..new_package_test 
# input_file = open('rasberry-20200203-hw-t1-smjjay-7d8b5bc0c204.json')

# print("測試引用不同packageg之JSON ",input_file.name)



#設定dialogflow初始化
DIALOGFLOW_PROJECT_ID = 'rasberry-20200203-hw-t1-smjjay' 
DIALOGFLOW_LANGUAGE_CODE = 'Chinese (Traditional) — zh-TW'
GOOGLE_APPLICATION_CREDENTIALS = service_account.Credentials.from_service_account_file('rasberry-20200203-hw-t1-smjjay-52e40a174465.json')
SESSION_ID = '52e40a174465ba81525a4281d34287cda6ef504a' #金鑰

#create a session client
session_client = dialogflow.SessionsClient(credentials=GOOGLE_APPLICATION_CREDENTIALS)
session = session_client.session_path(DIALOGFLOW_PROJECT_ID, SESSION_ID)
#print("client>>",end="")

#obtain audio from the microphone
r=sr.Recognizer()
with sr.Microphone() as source:
    print("請稍等. 接收麥克風中...")
    #listen for 5 seconds and create the ambient noise energy level
    r.adjust_for_ambient_noise(source, duration=5) # turn 5s to 2s
    print("請開始說話!")
    audio=r.listen(source)

# while 2:
    
    print("You said>>",end="")
    
    # text_to_be_analyzed = input() #輸pip uninstall pylint 入的文字
    # text_input = dialogflow.types.TextInput(text=text_to_be_analyzed, language_code=DIALOGFLOW_LANGUAGE_CODE)
    # query_input = dialogflow.types.QueryInput(text=text_input)

    speech_to_text=r.recognize_google(audio, language="zh-TW")
    print(speech_to_text)
    text_input = dialogflow.types.TextInput(text=speech_to_text, language_code=DIALOGFLOW_LANGUAGE_CODE)
    print(text_input)
    
    query_input = dialogflow.types.QueryInput(text=text_input)
    # query_input = dialogflow.types.QueryInput(text=r.recognize_google(audio, language="zh-TW"))
    # print("測試資料類別是不是str ",type(r.recognize_google(audio, language="zh-TW")),end=" ")
    # print(type(r.recognize_google(audio, language="zh-TW")),end=" ")
    
    

    try:
        response = session_client.detect_intent(session=session, query_input=query_input)
    except InvalidArgument:
        raise
    # except sr.UnknownValueError:
    #     print("Google Speech Recognition could not understand audio")
    # except sr.RequestError as e:
    #     print("No response from Google Speech Recognition service: {0}".format(e))
    print("chatbot>>", response.query_result.fulfillment_text) #輸出的文字

'''
#輸入字串
print("輸入:")
text_to_be_analyzed = input() 

text_input = dialogflow.types.TextInput(text=text_to_be_analyzed, language_code=DIALOGFLOW_LANGUAGE_CODE)
query_input = dialogflow.types.QueryInput(text=text_input)

try:
    response = session_client.detect_intent(session=session, query_input=query_input)
except InvalidArgument:
    raise

print("Query text:", response.query_result.query_text)
print("Detected intent:", response.query_result.intent.display_name)
print("Detected intent confidence:", response.query_result.intent_detection_confidence)
print("Fulfillment text:", response.query_result.fulfillment_text)
'''