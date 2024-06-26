# Ordered Option

MongoDB에서 `ordered` 옵션은 `insertMany` 메서드와 함께 사용하여 여러 문서를 삽입할 때의 동작을 제어합니다. 이 옵션은 삽입 작업 중에 오류가 발생했을 때의 동작 방식을 결정하며, 데이터베이스의 무결성 및 성능에 영향을 미칠 수 있습니다.

## `ordered` 옵션

- **기본값**: `true`
- **용도**: `insertMany` 메서드로 여러 문서를 삽입할 때, 삽입 과정에서 오류가 발생했을 때 어떻게 처리할지 결정하는 옵션.
- **옵션 값**:
  - **`true`**: 삽입 작업 중 오류가 발생하면 즉시 중단. 오류가 발생한 위치에서 다음 삽입을 중단하므로, 일부 문서만 삽입될 수 있음.
  - **`false`**: 오류가 발생해도 나머지 문서를 계속 삽입. 전체 삽입 작업이 완료되기 전에 발생한 오류는 리스트에 포함되어 반환됨.

## `ordered: true`

- **설명**: 삽입 작업 중 오류가 발생하면 즉시 중단하고, 이후의 문서는 삽입되지 않음.
- **장점**: 데이터 무결성을 유지하고, 오류가 발생했을 때 어떤 문서가 삽입되지 않았는지 알 수 있음.
- **단점**: 단 하나의 오류로 인해 전체 삽입 작업이 중단되므로, 데이터 삽입이 부분적으로 완료될 수 있음.
- **예시**:
  
  ```javascript
  db.collection('users').insertMany(
    [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 'twenty' }, // 오류 발생
      { name: 'Sam', age: 25 },
    ],
    { ordered: true }
  );
  ```

이 예시에서는 `insertMany`를 `ordered: true`로 설정하고 세 개의 문서를 삽입하려 합니다. 두 번째 문서에서 오류가 발생하면 세 번째 문서가 삽입되지 않습니다.

## `ordered: false`

- **설명**: 오류가 발생해도 나머지 문서를 계속 삽입하여 최대한 많은 문서를 삽입할 수 있도록 함.
- **장점**: 오류가 발생해도 나머지 문서를 삽입할 수 있으므로, 대량 삽입 작업에 유리.
- **단점**: 데이터 무결성이 약해질 수 있으며, 오류가 발생한 문서와 삽입된 문서의 구분이 어려울 수 있음.
- **예시**:
  
  ```javascript
  db.collection('users').insertMany(
    [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 'twenty' }, // 오류 발생
      { name: 'Sam', age: 25 },
    ],
    { ordered: false }
  );
  ```

 `insertMany`를 `ordered: false`로 설정합니다. 두 번째 문서에서 오류가 발생해도 세 번째 문서는 정상적으로 삽입됩니다. 오류는 오류로 반환되고, 성공적으로 삽입된 문서 목록은 정상적으로 삽입됩니다.

## `ordered` 옵션 선택 기준

- **데이터 무결성**: 오류로 인한 데이터 삽입 중단을 원한다면 `ordered: true`를 사용.
- **대량 삽입 작업**: 최대한 많은 문서를 삽입하고자 할 때는 `ordered: false`를 사용.
- **오류 처리**: `ordered: true`는 오류가 발생한 지점에서 중단하므로, 어떤 문서가 삽입되지 않았는지 쉽게 알 수 있음

## Mongoose에서 어떻게 씀??

Mongoose에서 `insertMany` 메서드를 사용하여 여러 문서를 삽입할 때, `ordered` 옵션을 지정할 수 있습니다. 이 옵션을 통해 삽입 과정에서 오류가 발생할 때의 동작을 제어할 수 있습니다.

### `ordered: true`

`ordered: true`로 설정하면, 삽입 중에 오류가 발생할 경우 작업이 즉시 중단되고, 나머지 문서들은 삽입되지 않습니다. 이는 데이터 무결성을 유지하기 위해 사용됩니다.

### `ordered: false`

`ordered: false`로 설정하면, 오류가 발생해도 나머지 문서들을 계속 삽입합니다. 이는 대량 삽입 작업에서 일부 오류가 발생해도 최대한 많은 문서를 삽입하고자 할 때 사용됩니다.

Mongoose에서 `insertMany`와 `ordered` 옵션을 사용하는 예시를 살펴보겠습니다.

### `ordered: true` 사용 예시

```javascript
const mongoose = require('mongoose');
const User = require('./models/user'); // Mongoose 모델 임포트

// 문서 삽입
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 'twenty' }, // 오류 발생
  { name: 'Sam', age: 25 },
];

User.insertMany(users, { ordered: true })
  .then((result) => {
    console.log('Inserted documents:', result); // 오류 없이 삽입된 문서
  })
  .catch((err) => {
    console.error('Error:', err); // 오류 정보
  });
```

이 예시에서는 두 번째 문서에서 오류가 발생하므로, `ordered: true`로 설정하면 삽입 작업이 중단되고 나머지 문서들은 삽입되지 않습니다.

### `ordered: false` 사용 예시

```javascript
User.insertMany(users, { ordered: false })
  .then((result) => {
    console.log('Inserted documents:', result); // 오류 없이 삽입된 문서
  })
  .catch((err) => {
    console.error('Error:', err); // 오류 정보 (여러 오류 가능)
  });
```

`ordered: false`로 설정하면 오류가 발생해도 나머지 문서들은 계속 삽입됩니다. 오류 정보와 성공적으로 삽입된 문서 정보를 모두 반환합니다.
