# insertOne, insertMany >>> insert

MongoDB에서 데이터 삽입 작업은 여러 방식으로 수행할 수 있습니다. 간략하게 요약하면 다음과 같습니다:

## `insertOne`

- **설명**: 단일 문서를 컬렉션에 삽입하는 데 사용.
- **용도**: 한 번에 하나의 문서를 삽입할 때.
- **장점**: 간단하고 직관적이며, 특정 문서를 삽입하는 데 최적화.

- **예시**:

  ```javascript
  db.collection('users').insertOne({
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30,
  });
  ```

## `insertMany`

- **설명**: 여러 문서를 컬렉션에 한 번에 삽입하는 데 사용.
- **용도**: 여러 문서를 한 번에 삽입할 때.
- **장점**: 대량 삽입이 가능하며, 네트워크 및 데이터베이스 작업을 줄일 수 있음.
- **예시**:

  ```javascript
  db.collection('users').insertMany([
    { name: 'Jane Doe', email: 'janedoe@example.com', age: 28 },
    { name: 'Sam Smith', email: 'samsmith@example.com', age: 25 },
  ]);
  ```

### `insert`

- **설명**: MongoDB의 이전 버전에서 사용된 삽입 메서드로, 단일 문서와 여러 문서를 모두 삽입할 수 있음.
- **단점**: 최신 MongoDB에서는 권장되지 않으며, `insertOne`과 `insertMany`로 대체됨.
- **예시**:

  ```javascript
  db.collection('users').insert([
    { name: 'Alice', email: 'alice@example.com', age: 22 },
    { name: 'Bob', email: 'bob@example.com', age: 35 },
  ]);
  ```

## `insertOne`과 `insertMany`의 차이점

- **삽입할 문서 수**: `insertOne`은 단일 문서를, `insertMany`는 여러 문서를 한 번에 삽입.
- **네트워크 효율성**: `insertMany`는 여러 문서를 한 번에 처리하기 때문에 더 효율적.
- **트랜잭션 지원**: `insertMany`는 트랜잭션 지원이 가능.

### `insert` 대신 `insertOne`과 `insertMany`를 사용해야 하는 이유

- **구식 메서드**: `insert`는 최신 MongoDB에서 권장되지 않음.
- **명확성**: `insertOne`과 `insertMany`는 각각의 용도를 명확히 표현.
- **에러 처리 및 트랜잭션 지원**: `insertOne`과 `insertMany`는 개선된 에러 처리 및 트랜잭션 지원 기능 제공.

정리하면 `insertOne`, `insertMany`, `insert`의 차이점과 각 메서드를 사용할 때의 이점을 파악할 수 있음 `insertOne`과 `insertMany`는 최신 메서드로, MongoDB에서 데이터 삽입 작업을 수행할 때 권장
