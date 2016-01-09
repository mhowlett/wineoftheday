import nltk

with open ("qualities.txt", "r") as myfile:
    data=myfile.readlines()

len = 50000
content_text = ' '.join(data)
tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+|[^\w\s]+')
tokenized_content = tokenizer.tokenize(content_text)
content_model = nltk.NgramModel(3, tokenized_content)
content = content_model.generate(len)

cSentence = ""
numberSentencesToIgnore = 3

with open("output.txt", "w") as text_file:
    for x in range(0, len):
        next = ''
        if (x < len-1):
            next = content[x+1]
        current = content[x]

        cSentence = cSentence + current
        if current == ".":
            numberSentencesToIgnore = numberSentencesToIgnore - 1
            if numberSentencesToIgnore < 0:
                text_file.write(cSentence + "\n")
            cSentence = ""
            continue

        if next != "," and current != "-" and next != "-" and next != "." and next != "'" and current != "'":
            cSentence += " "

