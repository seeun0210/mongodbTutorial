# Understanding "find()" & the Cursor Object

- 일단 아래의 배열을 passenger이라는 collection에 넣어보자

```shell
    db.passengers.insertMany([
...   {
...     "name": "Max Schwarzmueller",
...     "age": 29
...   },
...   {
...     "name": "Manu Lorenz",
...     "age": 30
...   },
...   {
...     "name": "Chris Hayton",
...     "age": 35
...   },
...   {
...     "name": "Sandeep Kumar",
...     "age": 28
...   },
...   {
...     "name": "Maria Jones",
...     "age": 30
...   },
...   {
...     "name": "Alexandra Maier",
...     "age": 27
...   },
...   {
...     "name": "Dr. Phil Evans",
...     "age": 47
...   },
...   {
...     "name": "Sandra Brugge",
...     "age": 33
...   },
...   {
...     "name": "Elisabeth Mayr",
...     "age": 29
...   },
...   {
...     "name": "Frank Cube",
...     "age": 41
...   },
...   {
...     "name": "Karandeep Alun",
...     "age": 48
...   },
...   {
...     "name": "Michaela Drayer",
...     "age": 39
...   },
...   {
...     "name": "Bernd Hoftstadt",
...     "age": 22
...   },
...   {
...     "name": "Scott Tolib",
...     "age": 44
...   },
...   {
...     "name": "Freddy Melver",
...     "age": 41
...   },
...   {
...     "name": "Alexis Bohed",
...     "age": 35
...   },
...   {
...     "name": "Melanie Palace",
...     "age": 27
...   },
...   {
...     "name": "Armin Glutch",
...     "age": 35
...   },
...   {
...     "name": "Klaus Arber",
...     "age": 53
...   },
...   {
...     "name": "Albert Twostone",
...     "age": 68
...   },
...   {
...     "name": "Gordon Black",
...     "age": 38
...   }
... ]
... )
```

- 이렇게 입력하면

```shell
{
 "acknowledged" : true,
 "insertedIds" : [
  ObjectId("6617ed2bfab0047aed4935f2"),
  ObjectId("6617ed2bfab0047aed4935f3"),
  ObjectId("6617ed2bfab0047aed4935f4"),
  ObjectId("6617ed2bfab0047aed4935f5"),
  ObjectId("6617ed2bfab0047aed4935f6"),
  ObjectId("6617ed2bfab0047aed4935f7"),
  ObjectId("6617ed2bfab0047aed4935f8"),
  ObjectId("6617ed2bfab0047aed4935f9"),
  ObjectId("6617ed2bfab0047aed4935fa"),
  ObjectId("6617ed2bfab0047aed4935fb"),
  ObjectId("6617ed2bfab0047aed4935fc"),
  ObjectId("6617ed2bfab0047aed4935fd"),
  ObjectId("6617ed2bfab0047aed4935fe"),
  ObjectId("6617ed2bfab0047aed4935ff"),
  ObjectId("6617ed2bfab0047aed493600"),
  ObjectId("6617ed2bfab0047aed493601"),
  ObjectId("6617ed2bfab0047aed493602"),
  ObjectId("6617ed2bfab0047aed493603"),
  ObjectId("6617ed2bfab0047aed493604"),
  ObjectId("6617ed2bfab0047aed493605"),
  ObjectId("6617ed2bfab0047aed493606")
  ]
}
```

이렇게 값이 성공적으로 들어갔음을 볼 수 있다.

- 그럼 `find()`로 조회 해보자! 입력한 값들이 모두 나오겠지?
- 아니다... find()는 기본적으로 20개의 document만 찾아준다.

```
    db.passengers.find()
```

```
    { "_id" : ObjectId("6617ed2bfab0047aed4935f2"), "name" : "Max Schwarzmueller", "age" : 29 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f3"), "name" : "Manu Lorenz", "age" : 30 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f4"), "name" : "Chris Hayton", "age" : 35 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f5"), "name" : "Sandeep Kumar", "age" : 28 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f6"), "name" : "Maria Jones", "age" : 30 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f7"), "name" : "Alexandra Maier", "age" : 27 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f8"), "name" : "Dr. Phil Evans", "age" : 47 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f9"), "name" : "Sandra Brugge", "age" : 33 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fa"), "name" : "Elisabeth Mayr", "age" : 29 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fb"), "name" : "Frank Cube", "age" : 41 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fc"), "name" : "Karandeep Alun", "age" : 48 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fd"), "name" : "Michaela Drayer", "age" : 39 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fe"), "name" : "Bernd Hoftstadt", "age" : 22 }
{ "_id" : ObjectId("6617ed2bfab0047aed4935ff"), "name" : "Scott Tolib", "age" : 44 }
{ "_id" : ObjectId("6617ed2bfab0047aed493600"), "name" : "Freddy Melver", "age" : 41 }
{ "_id" : ObjectId("6617ed2bfab0047aed493601"), "name" : "Alexis Bohed", "age" : 35 }
{ "_id" : ObjectId("6617ed2bfab0047aed493602"), "name" : "Melanie Palace", "age" : 27 }
{ "_id" : ObjectId("6617ed2bfab0047aed493603"), "name" : "Armin Glutch", "age" : 35 }
{ "_id" : ObjectId("6617ed2bfab0047aed493604"), "name" : "Klaus Arber", "age" : 53 }
{ "_id" : ObjectId("6617ed2bfab0047aed493605"), "name" : "Albert Twostone", "age" : 68 }
Type "it" for more

```

여기에서 it을 입력하면 더 찾아준다.

```
    > it
{ "_id" : ObjectId("6617ed2bfab0047aed493606"), "name" : "Gordon Black", "age" : 38 }
```

이렇게 말이다,,,
나는 모든 문서를 다 조회하는 줄 알았는데 아니었다.

그럼 배열로 감싸진 형태로 모든 값을 조회하려면 어떻게 해야할까?

```shell
db.passengers.find().toArray()
```

```shell
> db.passengers.find().forEach((passengerData)=>{printjson(passengerData)})
[
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f2"),
		"name" : "Max Schwarzmueller",
		"age" : 29
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f3"),
		"name" : "Manu Lorenz",
		"age" : 30
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f4"),
		"name" : "Chris Hayton",
		"age" : 35
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f5"),
		"name" : "Sandeep Kumar",
		"age" : 28
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f6"),
		"name" : "Maria Jones",
		"age" : 30
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f7"),
		"name" : "Alexandra Maier",
		"age" : 27
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f8"),
		"name" : "Dr. Phil Evans",
		"age" : 47
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935f9"),
		"name" : "Sandra Brugge",
		"age" : 33
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935fa"),
		"name" : "Elisabeth Mayr",
		"age" : 29
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935fb"),
		"name" : "Frank Cube",
		"age" : 41
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935fc"),
		"name" : "Karandeep Alun",
		"age" : 48
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935fd"),
		"name" : "Michaela Drayer",
		"age" : 39
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935fe"),
		"name" : "Bernd Hoftstadt",
		"age" : 22
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed4935ff"),
		"name" : "Scott Tolib",
		"age" : 44
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493600"),
		"name" : "Freddy Melver",
		"age" : 41
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493601"),
		"name" : "Alexis Bohed",
		"age" : 35
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493602"),
		"name" : "Melanie Palace",
		"age" : 27
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493603"),
		"name" : "Armin Glutch",
		"age" : 35
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493604"),
		"name" : "Klaus Arber",
		"age" : 53
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493605"),
		"name" : "Albert Twostone",
		"age" : 68
	},
	{
		"_id" : ObjectId("6617ed2bfab0047aed493606"),
		"name" : "Gordon Black",
		"age" : 38
	}
]
```

```
db.passengers.find().forEach((passengerData)=>{printjson(passengerData)})
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f2"),
	"name" : "Max Schwarzmueller",
	"age" : 29
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f3"),
	"name" : "Manu Lorenz",
	"age" : 30
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f4"),
	"name" : "Chris Hayton",
	"age" : 35
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f5"),
	"name" : "Sandeep Kumar",
	"age" : 28
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f6"),
	"name" : "Maria Jones",
	"age" : 30
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f7"),
	"name" : "Alexandra Maier",
	"age" : 27
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f8"),
	"name" : "Dr. Phil Evans",
	"age" : 47
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f9"),
	"name" : "Sandra Brugge",
	"age" : 33
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935fa"),
	"name" : "Elisabeth Mayr",
	"age" : 29
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935fb"),
	"name" : "Frank Cube",
	"age" : 41
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935fc"),
	"name" : "Karandeep Alun",
	"age" : 48
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935fd"),
	"name" : "Michaela Drayer",
	"age" : 39
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935fe"),
	"name" : "Bernd Hoftstadt",
	"age" : 22
}
{
	"_id" : ObjectId("6617ed2bfab0047aed4935ff"),
	"name" : "Scott Tolib",
	"age" : 44
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493600"),
	"name" : "Freddy Melver",
	"age" : 41
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493601"),
	"name" : "Alexis Bohed",
	"age" : 35
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493602"),
	"name" : "Melanie Palace",
	"age" : 27
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493603"),
	"name" : "Armin Glutch",
	"age" : 35
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493604"),
	"name" : "Klaus Arber",
	"age" : 53
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493605"),
	"name" : "Albert Twostone",
	"age" : 68
}
{
	"_id" : ObjectId("6617ed2bfab0047aed493606"),
	"name" : "Gordon Black",
	"age" : 38
}
```
이렇게도 사용이 가능하다.

## 정리
MongoDB의 find() 메소드는 컬렉션에서 문서를 조회할 때 사용되며, 결과는 커서(Cursor) 객체 형태로 반환됩니다. 커서는 실제로 데이터베이스의 문서 집합을 가리키는 포인터 같은 것으로, 이를 통해 반환된 문서들을 순회하거나 조작할 수 있습니다.

### Cursor 객체의 기본 동작
- **Lazy Loading**: find() 메소드로 데이터를 조회할 때, MongoDB는 즉시 모든 결과를 메모리에 로드하지 않습니다. 대신, 커서를 반환하고, 클라이언트가 요청할 때마다 문서를 순차적으로 로드합니다. 이는 대용량 데이터를 효율적으로 처리할 수 있게 해줍니다.
- **반복 가능**: 반환된 커서는 반복 가능한 객체이며, MongoDB shell에서는 이를 순회하기 위해 forEach(), toArray() 같은 메소드를 사용할 수 있습니다.
- **자동 종료**: 클라이언트가 커서를 통해 모든 문서를 순회하면, MongoDB는 자동으로 커서를 종료합니다. 하지만, 모든 문서를 순회하기 전에 작업을 중단하면, 커서는 일정 시간 후에 서버에서 자동으로 닫힙니다.

### 모든 문서 조회 방법

#### 1. `toArray()` 메소드 사용:

find() 메소드의 결과를 배열로 변환하여 모든 문서를 한 번에 메모리에 로드합니다.
작은 데이터 세트에 적합하며, 큰 데이터 세트의 경우 메모리 이슈를 유발할 수 있습니다.

```
db.passengers.find().toArray()
```

#### 2. `forEach()` 메소드 사용:

각 문서에 대해 주어진 함수를 실행하여, 문서를 하나씩 처리할 수 있습니다.
이 방법은 대용량 데이터에도 효율적이며, 각 문서를 개별적으로 조작할 수 있습니다.

### MongoDB Shell의 Paging

MongoDB shell은 기본적으로 find() 연산으로 조회된 결과의 첫 20개 문서만 출력합니다. 이는 대화형 쉘 환경에서 데이터를 쉽게 탐색하기 위한 조치입니다.
더 많은 결과를 보기 위해서는 it 명령어를 입력하여 다음 페이지의 결과를 볼 수 있습니다.