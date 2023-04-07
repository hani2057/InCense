def text_reader(file_name):
    file = open(file_name)
    encoded_imgs = file.readlines()
    done_read = []
    temp = encoded_imgs[0]
    for i in range(1, len(encoded_imgs)):
        ele = encoded_imgs[i]
        if '[' in ele:
            idx = ele.find(';')
            front, back = ele[:idx], ele[idx + 1:]
            temp += front
            done_read.append(temp)
            temp = back
        else:
            temp += ele
    done_read.append(temp)
    done_union = []
    for dd in done_read:
        now = ''
        for d in dd:
            now += d
        done_union.append(now)
    done_split = []
    for nd in done_union:
        done_split.append(nd.split(' '))
    result = []
    for line in done_split:
        temp = []
        for j in range(len(line)):
            word = line[j]
            if '[' in word:
                line[j] = word[1:]
            if '\n' in word:
                line[j] = word[:-2]
            if ']' in word:
                line[j] = word[:-1]
            if word == '' or word == ']':
                continue
            temp.append(line[j])
        result.append(temp)
    for res in result:
        is_wrong = False
        for ii in range(len(res)):
            if res[ii] == '':
                is_wrong = True
                continue
            res[ii] = float(res[ii])
        if is_wrong:
            res.pop(0)
    return result


def name_reader(file_name):
    file = open(file_name)
    lines = file.readlines()[0]
    names = []
    temp = ''
    for i in lines:
        if i == ';':
            names.append(temp)
            temp = ''
            continue
        temp += i
    names.append(temp)
    return names

def theme_reader(file_name):
    file = open(file_name)
    lines = file.readlines()[0]
    names = []
    temp = ''
    for i in lines[:-1]:
        if i == ';':
            names.append(float(temp))
            temp = ''
            continue
        temp += i
    names.append(float(temp))
    return names
