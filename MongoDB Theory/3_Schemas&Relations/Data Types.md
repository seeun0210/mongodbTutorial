# Data Types & Limits

- 참고 문서
https://www.mongodb.com/docs/drivers/node/current/

```shell
db.companies.insertOne({name:"Fresh Apples Inc",isStartup:true, employees:33,funding:12345678901234567890,details:{ceo:"Mark Super"},tags:[{title:"super"},{title:"perfect"}],fundingDate:new Date(),insertAt: new Timestamp()})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("661d3ce9fab0047aed49360d")
}
```

이와 같이 shell script는 javascript를 따른다는 것을 알 수 있다. 

```shell
db.companies.findOne()
{
	"_id" : ObjectId("661d3ce9fab0047aed49360d"),
	"name" : "Fresh Apples Inc",
	"isStartup" : true,
	"employees" : 33,
	"funding" : 12345678901234567000,
	"details" : {
		"ceo" : "Mark Super"
	},
	"tags" : [
		{
			"title" : "super"
		},
		{
			"title" : "perfect"
		}
	],
	"fundingDate" : ISODate("2024-04-15T14:42:49.052Z"),
	"insertAt" : Timestamp(1713192169, 1)
}

```

그런데 여기에서 funding을 `12345678901234567890`을 입력했는데 db에 저장된 값은 `12345678901234567000`이다. 
js는 근본적으로 64bit 부동 소수점 값인데 제한되었음을 볼 수 있다.

https://www.mongodb.com/docs/manual/reference/limits/

## 정리

### 제한 사항
- **단일 문서 크기**: 컬렉션 내의 한 문서(임베디드 문서 포함)는 최대 16MB를 넘지 않아야 합니다.
- **임베디드 문서의 수준**: 임베디드 문서의 최대 깊이는 100단계를 넘지 않아야 합니다.

자세한 제한 사항은 여기에서 확인할 수 있습니다:
[https://docs.mongodb.com/manual/reference/limits/](https://docs.mongodb.com/manual/reference/limits/)

### 데이터 타입
MongoDB에서 지원하는 데이터 타입의 자세한 개요는 여기에서 확인할 수 있습니다:
[https://docs.mongodb.com/manual/reference/bson-types/](https://docs.mongodb.com/manual/reference/bson-types/)

#### 중요한 데이터 타입 제한:

- **일반 정수 (int32)**: 최대 값 ±2,147,483,647
- **긴 정수 (int64)**: 최대 값 ±9,223,372,036,854,775,807
- **텍스트**: 원하는 길이만큼 가능 - 전체 문서에 대한 16MB 제한이 적용됨

### 데이터 타입과 쉘의 차이점
- **NumberInt**는 int32 값을 생성합니다: `NumberInt(55)`
- **NumberLong**는 int64 값을 생성합니다: `NumberLong(7489729384792)`
- 쉘에서 숫자를 사용할 경우(예: `insertOne({a: 1})`), 이는 데이터베이스에 일반 double로 추가됩니다. 이는 쉘이 JS 기반으로 작동하며 JS는 정수와 부동 소수점을 구분하지 않기 때문입니다.
- **NumberDecimal**는 고정밀도 double 값을 생성합니다: `NumberDecimal("12.99")`. 이는 정확한 소수점이 필요한 계산에 유용합니다.

### 프로그래밍 언어용 MongoDB 드라이버 사용
쉘 대신 앱 프로그래밍 언어(예: PHP, .NET, Node.js 등)용 MongoDB 드라이버를 사용할 수 있습니다. 예를 들어, Node.js에서는 다음과 같이 `NumberLong` 값을 생성할 수 있습니다.

```javascript
const Long = require('mongodb').Long;
 
db.collection('wealth').insert({
    value: Long.fromString("121949898291")
});
```

사용 중인 드라이버의 API 문서를 참조하면 int32, int64 등을 생성하는 메서드를 확인할 수 있습니다.