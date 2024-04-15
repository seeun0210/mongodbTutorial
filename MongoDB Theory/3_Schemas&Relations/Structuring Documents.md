# Structuring Documents

```shell
{
	"_id" : ObjectId("661d3716fab0047aed493607"),
	"name" : "A book",
	"price" : 12.99
}
{
	"_id" : ObjectId("661d372efab0047aed493608"),
	"name" : "A T-shirt",
	"price" : 20.99
}
{
	"_id" : ObjectId("661d375ffab0047aed493609"),
	"name" : "A Computer",
	"price" : 1299,
	"details" : {
		"cpu" : "Intel i7 8700"
	}
}
```


```shell
{
	"_id" : ObjectId("661d37bffab0047aed49360a"),
	"name" : "A book",
	"price" : 12.99,
	"details" : null
}
{
	"_id" : ObjectId("661d37ccfab0047aed49360b"),
	"name" : "A T-shirt",
	"price" : 20.99,
	"details" : null
}
{
	"_id" : ObjectId("661d37d3fab0047aed49360c"),
	"name" : "A Computer",
	"price" : 1299,
	"details" : {
		"cpu" : "Intel i7 8700"
	}
}
```

- 첫 번째 데이터셋에서는 일부 문서에 details 필드가 없음.
- 두 번째 데이터셋에서는 모든 문서에 details 필드가 있으며, 일부는 null로 설정됨.


이렇게 문서의 구조가 유연하여, 같은 컬렉션 내에서도 문서 구조가 다를 수 있습니다.