%include "io.inc"
;(a-b)*c
;9, 30, 31
;ответ: (9-30)*31=-651
section .text
global CMAIN
CMAIN:
;записываем числа в регистры
    MOV AX, 0x09
    MOV BX, 0x1E
    MOV CX, 0x1F
    SUB AX, BX ;вычитаем из a b 
    IMUL CX ;перемножаем а-b и c
    PRINT_DEC 2, AX
    NEWLINE
;(a-b)*c
;6, 18, 13
;ответ: (6-18)*13=-156    
    ;записываем числа в регистры
    MOV AX, 0x06
    MOV BX, 0x12
    MOV CX, 0x0D
    SUB AX, BX ;вычитаем из a b 
    IMUL CX ;перемножаем а-b и c
    PRINT_DEC 2, AX
    ret
