def solicitar_nota(mensagem):
    while true:
     try:
        nota = float(input(mensagem))
        return nota
     
     except ValueError:
       
       print("Erro: por favor, insira um número válido. ")

      
    try:
       nota1 = solicitar_nota("Digite a primera nota: ")
       nota2 = solicitar_nota("Digite a segunda nota: ")
       nota3 = solicitar_nota("Digite a terceira nota: ")

       media = (nota1 + nota2 + nota3)/3
       
    if media < 60:
          print(f"Média: {media:.2f} - Reprovado")
    else:

     print(f"Média: {media:.2f} - Aprovado") 

     except Exception as e:
    print (f"Ocorreu um erro inesperado:"{e})