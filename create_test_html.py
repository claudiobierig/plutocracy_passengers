#!/bin/python

import bs4

with open("index.html") as inf:
    txt = inf.read()
    soup = bs4.BeautifulSoup(txt)

qunit_css = soup.new_tag("link", rel="stylesheet", href="https://code.jquery.com/qunit/qunit-2.20.0.css")
#soup.head.append(qunit_css)
style = soup.find("link", href="styles.css")
style['rel'] = "stylesheet"
style['href'] = "https://code.jquery.com/qunit/qunit-2.20.0.css"

root = soup.find("div", id="root")
root['style'] = "display: none;"

qunit_div = soup.new_tag("div", id="qunit")
qunit_fixture_div = soup.new_tag("div", id="qunit-fixture")
qunit_js = soup.new_tag("script", src="https://code.jquery.com/qunit/qunit-2.20.0.js")
test_cases = soup.new_tag("script", src="tests.js")

soup.body.append(qunit_div)
soup.body.append(qunit_fixture_div)
soup.body.append(qunit_js)
soup.body.append(test_cases)

# save the file again
with open("test.html", "w") as outf:
    outf.write(str(soup.prettify()))