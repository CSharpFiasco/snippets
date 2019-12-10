#POSTGRES DATABASE
#DEPENDS ON psycopg2
def make_conn():
    conn = None
    try:
        conn = psycopg2.connect("dbname='%s' user='%s' host='%s' password='%s'" % (db_name, db_user, db_host, db_pass))
        print("connected to db")
    except:
        print ("I am unable to connect to the database")
    return conn

def fetch_data(conn, query):
    result = []
    #print ("Now executing: %s" % (query))
    cursor = conn.cursor()
    cursor.execute(query)
    
    raw = cursor.fetchall()
    for line in raw:
        result.append(line)
    
    return result

def set_data(conn, query):
    #print ("Now executing: %s" % (query))
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()

#sanitizing sql string
def toSQL(string):
	# print(string)
	string = str(string)
	string.replace('\'', '\'\'')
	return str

#returns positive integer
def days_between(d1, d2):
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

#t: timeDelta from datetime library
#returns decimal
def timeDeltaToSeconds(t):
    return t.total_seconds()