# update & updateMany

## MongoDB `update` 명령어 사용하기

`update` 명령어는 기본적으로 문서 전체를 새로운 내용으로 교체합니다. 특정 필드의 값만 변경하고 싶은 경우, `$set` 연산자를 사용해야 합니다.

### 예제

다음 명령어는 `_id`가 `ObjectId("6616b3e9fab0047aed4935f0")`인 문서를 찾아 `delayed` 필드의 값을 `true`로 변경합니다.

```shell
db.flightData.update(
    { "_id": ObjectId("6616b3e9fab0047aed4935f0") },
    { "$set": { "delayed": true } }
)
```

### 주의사항

- 문서 교체: update 명령어를 사용할 때 $set 연산자 없이 문서 전체를 새로운 문서로 제공하면, 기존 문서는 제공된 새로운 문서로 완전히 교체됩니다.

- 단일 문서 업데이트: update 명령어는 기본적으로 첫 번째로 매치되는 단일 문서만 업데이트합니다. 모든 매칭되는 문서를 업데이트하려면 `updateMany` 명령어를 사용해야 합니다.
  - 단, 이때 `$set`연산자와 함께 사용해야함.

- update vs updateOne,updateMany
  - update: `$set`연산자와 함께 사용하지 않아도 작동함
  - updateOne,updateMany의 경우 `$set`연산자와 함께 쓰지 않으면 에러가 남

```shell
  > db.flightData.updateOne({_id:ObjectId("6616b3e9fab0047aed4935f0")},{"departureAirport" : "MUC",})
  >
    uncaught exception: Error: the update operation document must contain atomic operators :
    DBCollection.prototype.updateOne@src/mongo/shell/crud_api.js:565:19
    @(shell):1:1
```

- document를 덮어쓰고 싶은 경우(PUT): `replace`를 사용하는 것 이 적절하다.
- document의 일부를 수정하고 싶은 경우(PATCH): `updateOne` 또는 `updateMany`가 적절