import mysql.connector
from mysql.connector import Error 
# Função para conectar ao banco de MySQL 
def conectar_banco():
 try: 
  conn = mysql.connector.connect(
   host='localhost' # Endereço do servidor MySQL
   database='clientes_db', # Nome do banco de dados 
   user='root', 
  )
       