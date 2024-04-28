# LookUp()

`$lookup`는 MongoDB에서 사용되는 강력한 어그리게이션 파이프라인 단계로, 서로 다른 컬렉션에서 데이터를 조인하거나 병합할 수 있게 해줍니다. SQL의 조인과 유사한 역할을 하지만, MongoDB는 스키마가 없기 때문에 유연하게 사용할 수 있습니다.

`$lookup`는 다음과 같은 주요 파라미터를 포함합니다:

- **`from`**: 조인할 컬렉션의 이름.
- **`localField`**: 현재 컬렉션에서 조인을 위해 사용할 필드.
- **`foreignField`**: 조인할 컬렉션에서 일치하는 필드.
- **`as`**: 결과를 저장할 필드 이름.

기본적인 `$lookup` 예시:

```json
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer_info"
    }
  }
])
```

이 예시에서는 `orders` 컬렉션에서 `customer_id` 필드를 기준으로 `customers` 컬렉션과 조인하고, 조인된 데이터를 `customer_info` 필드로 결과에 포함합니다.

또한, `$lookup`는 다음과 같은 추가 파라미터를 지원합니다:

- **`pipeline`**: 조인된 컬렉션에서 추가적인 어그리게이션 파이프라인 단계를 적용할 수 있습니다.
- **`let`**: 로컬 변수를 사용하여 `pipeline`을 구성할 때 도움이 됩니다.

예를 들어, 조인 후 필터링을 수행하는 `$lookup`:

```json
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      let: { order_id: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$order_id", "$$order_id"] } } },
        { $project: { product_name: 1, quantity: 1 } }
      ],
      as: "product_info"
    }
  }
])
```

이 예시에서는 `products` 컬렉션에서 `order_id` 필드를 기준으로 추가적인 필터링을 통해 데이터를 가져옵니다.

이러한 다양한 기능을 통해 `$lookup`은 MongoDB에서 관계형 데이터베이스의 조인과 유사한 기능을 제공합니다.
