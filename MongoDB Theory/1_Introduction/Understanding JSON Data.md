# Understanding JSON Data

```javascript
db.flightData.insertOne({
    "departureAirport": "MUC",
    "arrivalAirport": "SFO",
    "aircraft": "Airbus A380",
    "distance": 12000,
    "intercontinental": true
})
```

```json
{
 "acknowledged" : true,
 "insertedId" : ObjectId("6616ac7bfab0047aed4935ee")
}
```

```shell
> db.flightData.find().pretty()
{
 "_id" : ObjectId("6616ac7bfab0047aed4935ee"),
 "departureAirport" : "MUC",
 "arrivalAirport" : "SFO",
 "aircraft" : "Airbus A380",
 "distance" : 12000,
 "intercontinental" : true
}
```

- `extra_id`라는것도 있음
- `_id`는 timestamp가 내장되어있기때문에 정렬에도 사용할 수 있다.

## MongoDB와 BSON

MongoDB는 데이터 저장 및 검색에 JSON 형식을 사용하는 것처럼 보이지만, 실제로는 BSON(Binary JSON)이라는 효율적인 바이너리 형식을 사용합니다.

### BSON의 특징

- **바이너리 형식**: BSON은 데이터를 바이너리 형태로 저장하며, 이는 데이터 처리 속도와 효율성을 개선합니다.

- **추가 데이터 타입 지원**: JSON에서는 사용할 수 없는 `ObjectId`, `Date`, `Binary data` 등과 같은 다양한 데이터 타입을 지원합니다. 이로 인해 더 다양한 형태의 데이터를 효율적으로 저장하고 관리할 수 있습니다.

- **공간 효율성**: 데이터를 압축하여 저장하기 때문에, JSON 텍스트에 비해 더 적은 저장 공간을 차지합니다. 이는 특히 대용량 데이터를 처리할 때 중요한 이점을 제공합니다.

### MongoDB 드라이버의 역할

MongoDB 드라이버는 애플리케이션 코드와 MongoDB 서버 간의 중간자 역할을 합니다. 드라이버는 다음과 같은 작업을 수행합니다:

- **데이터 변환**: 애플리케이션에서 작성한 JSON 형태의 데이터를 BSON 형식으로 자동 변환합니다. 이 변환 과정은 개발자로부터 투명하게 이루어지며, 데이터베이스와의 통신을 최적화합니다.

- **통신 관리**: 애플리케이션과 MongoDB 서버 간의 통신을 관리하며, 데이터 쿼리와 명령어 실행을 위한 인터페이스를 제공합니다.
  
  ```shell
  > db.flightData.insertOne({departureAirport:"TXL",arrivalAirport:"LHR",_id:"txl-lhr-1"})
  >
  >
  >
  >
  { "acknowledged" : true, "insertedId" : "txl-lhr-1" }
  > db.flightData.find().pretty()
	{
		"_id" : ObjectId("6616ac7bfab0047aed4935ee"),
		"departureAirport" : "MUC",
		"arrivalAirport" : "SFO",
		"aircraft" : "Airbus A380",
		"distance" : 12000,
		"intercontinental" : true
	}
	{
		"_id" : ObjectId("6616afe7fab0047aed4935ef"),
		"departureAirport" : "TXL",
		"arrivalAirport" : "LHR"
	}
	{
		"_id" : "txl-lhr-1",
		"departureAirport" : "TXL",
		"arrivalAirport" : "LHR"
	}
	> db.flightData.insertOne({departureAirport:"TXL",arrivalAirport:"LHR",_id:"txl-lhr-1"})	
	WriteError({
	"index" : 0,
	"code" : 11000,
	"errmsg" : "E11000 duplicate key error collection: flights.flightData index: _id_ dup key: { _id: \"txl-lhr-1\" }",
	"op" : {
		"departureAirport" : "TXL",
		"arrivalAirport" : "LHR",
		"_id" : "txl-lhr-1"
	}
	}) :
	WriteError({
		"index" : 0,
		"code" : 11000,
	"errmsg" : "E11000 duplicate key error collection: flights.	flightData index: _id_ dup key: { _id: 	\"txl-lhr-1\" }",
		"op" : {
		"departureAirport" : "TXL",
		"arrivalAirport" : "LHR",
 		 "_id" : "txl-lhr-1"
	 }
	})
	WriteError@src/mongo/shell/bulk_api.js:465:48
	mergeBatchResults@src/mongo/shell/bulk_api.js:871:49
	executeBatch@src/mongo/shell/bulk_api.js:940:13
	Bulk/this.execute@src/mongo/shell/bulk_api.js:1182:21
	DBCollection.prototype.insertOne@src/mongo/shell/crud_api.js:264:9
	@(shell):1:1
	```