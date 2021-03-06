def answer(n):
    step_count = 0
    n = abs(int(n))
    
    while(n > 1):
        if(n % 2 != 0):
            n += 1
            step_count += 1
        elif n == 3 or n % 4 == 1:
            n -= 1
            step_count += 1
        n = n / 2
        step_count += 1

    return step_count

def main():
    print answer("15")
    print answer("14")
    print answer("4")
    print answer("456546546654512316849849465487987975465465489879846546543612436512362112321123136812438142384129834198243918242198754316888798765465441324654878754684984645654654665451231684984946548798797546546548987984654654361243651236211232112313681243814238412983419824391824219875431688879876546544132465487875447518885")

if __name__ == "__main__":
    main()
