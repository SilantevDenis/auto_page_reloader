from selenium import webdriver
import threading
import time
import random

# Функция для загрузки веб-страницы в отдельном окне браузера с рандомным интервалом
def load_website_in_browser(url, interval_from, interval_to, thread_id):
    print(f"Thread {thread_id}: Initializing WebDriver")
    driver = webdriver.Chrome()  # Создаём экземпляр драйвера для каждого потока

    try:
        while True:
            interval = random.randint(interval_from, interval_to)  # Выбираем случайный интервал
            print(f"Thread {thread_id}: Loading {url} with interval {interval} seconds")
            driver.get(url)  # Загружаем страницу
            print(f"Thread {thread_id}: Page {url} loaded successfully")
            time.sleep(interval)  # Ожидаем заданный интервал перед следующей загрузкой
    finally:
        driver.quit()  # Закрываем браузер после завершения работы
        print(f"Thread {thread_id}: WebDriver closed")

# Список сайтов с индивидуальными настройками
websites = [
    {"url": "https://vc.ru/future/1041675-pochemu-ai-roboty-eshche-ne-zamenili-sluzhbu-podderzhki", "interval_from": 3, "interval_to": 6, "windows_count": 3},
    {"url": "https://vc.ru/future", "interval_from": 2, "interval_to": 3, "windows_count": 3}
]

threads = []

for website in websites:
    for i in range(website["windows_count"]):
        # Создаём и запускаем поток для каждого окна
        thread = threading.Thread(target=load_website_in_browser, args=(
            website["url"],
            website["interval_from"],
            website["interval_to"],
            f"{website['url']} #{i+1}"
        ))
        threads.append(thread)
        thread.start()

# Ждём завершения всех потоков (этот блок кода можно опустить, если вы хотите, чтобы скрипт работал бесконечно)
for thread in threads:
    thread.join()
