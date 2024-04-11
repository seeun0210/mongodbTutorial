# Embedded Documents

- 100깨까지 nesting이 가능
- 전체 document의 크기가 60mb 이하여야 함
- 저장할 수 있는 데이터는 array임(배열은 어떤 데이터든 담을 수 있음)

## Working With Embedded Documents

```shell
    db.flightData.updateMany({},{$set:{status:{description:"on-time",lastUpdated:"1 hour ago"}}})
```

```shell
{
	"_id" : ObjectId("6616b3e9fab0047aed4935f0"),
	"departureAirport" : "MUC",
	"status" : {
		"description" : "on-time",
		"lastUpdated" : "1 hour ago"
	}
}
{
	"_id" : ObjectId("6616b3e9fab0047aed4935f1"),
	"departureAirport" : "LHR",
	"arrivalAirport" : "TXL",
	"aircraft" : "Airbus A320",
	"distance" : 950,
	"intercontinental" : false,
	"status" : {
		"description" : "on-time",
		"lastUpdated" : "1 hour ago"
	}
}
```

```
> db.flightData.find().pretty()
{
	"_id" : ObjectId("6616b3e9fab0047aed4935f0"),
	"departureAirport" : "MUC",
	"status" : {
		"description" : "on-time",
		"lastUpdated" : "1 hour ago",
		"details" : {
			"responsibile" : "Max Schwarz"
		}
	}
}
{
	"_id" : ObjectId("6616b3e9fab0047aed4935f1"),
	"departureAirport" : "LHR",
	"arrivalAirport" : "TXL",
	"aircraft" : "Airbus A320",
	"distance" : 950,
	"intercontinental" : false,
	"status" : {
		"description" : "on-time",
		"lastUpdated" : "1 hour ago",
		"details" : {
			"responsibile" : "Max Schwarz"
		}
	}
}
```

## Working with Arrays