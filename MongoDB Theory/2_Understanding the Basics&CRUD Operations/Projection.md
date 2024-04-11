# Projection

document에서 필요없는 속성들은 제외하고 가져올 수 있다.

```shell
db.passengers.find({},{name:1}).pretty()
```

```
{
	"_id" : ObjectId("6617ed2bfab0047aed4935f2"),
	"name" : "Max Schwarzmueller"
}
{ "_id" : ObjectId("6617ed2bfab0047aed4935f3"), "name" : "Manu Lorenz" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f4"), "name" : "Chris Hayton" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f5"), "name" : "Sandeep Kumar" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f6"), "name" : "Maria Jones" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f7"), "name" : "Alexandra Maier" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f8"), "name" : "Dr. Phil Evans" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935f9"), "name" : "Sandra Brugge" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fa"), "name" : "Elisabeth Mayr" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fb"), "name" : "Frank Cube" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fc"), "name" : "Karandeep Alun" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fd"), "name" : "Michaela Drayer" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935fe"), "name" : "Bernd Hoftstadt" }
{ "_id" : ObjectId("6617ed2bfab0047aed4935ff"), "name" : "Scott Tolib" }
{ "_id" : ObjectId("6617ed2bfab0047aed493600"), "name" : "Freddy Melver" }
{ "_id" : ObjectId("6617ed2bfab0047aed493601"), "name" : "Alexis Bohed" }
{ "_id" : ObjectId("6617ed2bfab0047aed493602"), "name" : "Melanie Palace" }
{ "_id" : ObjectId("6617ed2bfab0047aed493603"), "name" : "Armin Glutch" }
{ "_id" : ObjectId("6617ed2bfab0047aed493604"), "name" : "Klaus Arber" }
{ "_id" : ObjectId("6617ed2bfab0047aed493605"), "name" : "Albert Twostone" }
```

name만 가져오고 싶은데 _id도 같이 따라온다. 
_id도 없애고 싶다면?

```shell
> db.passengers.find({},{name:2,_id:0}).pretty()

{ "name" : "Max Schwarzmueller" }
{ "name" : "Manu Lorenz" }
{ "name" : "Chris Hayton" }
{ "name" : "Sandeep Kumar" }
{ "name" : "Maria Jones" }
{ "name" : "Alexandra Maier" }
{ "name" : "Dr. Phil Evans" }
{ "name" : "Sandra Brugge" }
{ "name" : "Elisabeth Mayr" }
{ "name" : "Frank Cube" }
{ "name" : "Karandeep Alun" }
{ "name" : "Michaela Drayer" }
{ "name" : "Bernd Hoftstadt" }
{ "name" : "Scott Tolib" }
{ "name" : "Freddy Melver" }
{ "name" : "Alexis Bohed" }
{ "name" : "Melanie Palace" }
{ "name" : "Armin Glutch" }
{ "name" : "Klaus Arber" }
{ "name" : "Albert Twostone" }
Type "it" for more

```
MongoDB에서 문서의 특정 필드만 선택하여 조회하는 기능을 **프로젝션(projection)**이라고 합니다. 이를 통해 문서에서 필요한 정보만 추출할 수 있으며, 데이터 전송량을 최소화하여 성능을 향상시킬 수 있습니다.

프로젝션은 find() 메소드의 두 번째 파라미터로 지정되며, 포함하고자 하는 필드에는 1 또는 true, 제외하고자 하는 필드에는 0 또는 false를 설정합니다. 기본적으로, _id 필드는 항상 포함되지만, 이를 제외하고자 할 때는 명시적으로 _id: 0을 설정해야 합니다.