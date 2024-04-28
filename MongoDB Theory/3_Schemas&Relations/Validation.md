# Validation

typeOrm에서 했던것과 같이 db에 저장되는 타입을 그대로 가져와서 validation을 처리하는 방법은 없을까?라는 의문이 생겨서 찾아보았다.

## 유효성 검사 수준(Validation Level)

유효성 검사의 강도를 결정하는 설정입니다. MongoDB에서는 두 가지 유효성 검사 수준을 제공합니다:

- **`strict`**: 데이터가 유효성 검사를 통과하지 않으면 오류가 발생하며, 데이터가 저장되지 않음.일반적으로 유효성 검사를 엄격하게 적용하고자 할 때 사용
- **`moderate`**: 유효성 검사에 실패한 경우에도 기존 데이터의 업데이트를 허용할 수 있. 새로운 데이터에만 엄격한 검사가 적용

## 유효성 검사 작업(Validation Action)

유효성 검사를 통과하지 않는 데이터에 대해 어떤 작업을 수행할지 결정합니다. 다음 두 가지 선택지가 있습니다:

- **`error`**: 유효성 검사에 실패하면 오류가 발생하고, 데이터가 저장되지 않습니다.
- **`warn`**: 유효성 검사에 실패하면 경고가 생성되지만, 데이터는 저장됩니다.

## 유효성 검사 규칙

유효성 검사 규칙은 JSON 스키마를 기반으로 합니다. 스키마를 통해 데이터의 타입, 필수 필드, 조건 등을 정의할 수 있습니다. 주요 요소는 다음과 같습니다:

- **`$jsonSchema`**: 컬렉션 생성 시 사용되는 JSON 스키마입니다. 이 스키마는 데이터 타입, 필수 필드, 제약 조건 등을 정의합니다.
- **`bsonType`**: 필드의 BSON 타입을 지정합니다(예: "string", "objectId", "array").
- **`required`**: 필수 필드를 지정합니다.
- **`properties`**: 각 필드의 세부적인 유효성 검사 규칙을 지정합니다.

다음은 유효성 검사가 설정된 컬렉션을 생성하는 예시입니다:

```json
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "@",
          description: "must contain '@' and is required"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          description: "must be an integer and at least 18"
        }
      }
    }
  },
  validationLevel: "strict", // 유효성 검사 수준
  validationAction: "error" // 유효성 검사 작업
});
```

이 예시에서는 "users" 컬렉션을 생성하면서, "name"과 "email"이 필수 필드이며, "email" 필드는 "@"를 포함해야 하고, "age"는 18세 이상이어야 한다는 규칙을 설정합니다.

유효성 검사는 데이터베이스의 데이터 무결성을 유지하는 데 필수적입니다. 이를 통해 데이터의 잘못된 저장을 방지하고, 데이터베이스의 신뢰성을 높일 수 있습니다.

그럼 이걸 `Mongoose`로 구현한다면??

Mongoose는 MongoDB와 달리 스키마 기반의 ODM(Object-Document Mapper)입니다. Mongoose를 사용하면 스키마를 통해 데이터 구조를 정의하고, 유효성 검사를 설정할 수 있습니다. MongoDB의 JSON 스키마와 유사하게, Mongoose 스키마를 통해 필드의 타입, 필수 여부, 제약 조건 등을 정의합니다.

Mongoose에서 유효성 검사를 설정하는 방법을 설명하겠습니다.

## Mongoose 스키마(Schema) 생성

Mongoose에서 스키마를 생성할 때, 각 필드의 타입과 유효성 검사를 설정할 수 있습니다. 필수 필드, 기본값, 사용자 정의 유효성 검사 등을 지정할 수 있습니다.

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 유저 스키마 생성
const userSchema = new Schema({
  name: {
    type: String, // 데이터 타입
    required: true, // 필수 필드
    trim: true, // 공백 제거
  },
  email: {
    type: String,
    required: true,
    unique: true, // 유니크 제약 조건
    match: /.+\@.+\..+/, // 이메일 형식 검사
  },
  age: {
    type: Number,
    min: 18, // 최소값
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // 기본값
  },
});
```

이 예시에서는 다음과 같은 유효성 검사를 설정했습니다:

- **`required`**: 필수 필드 지정.
- **`trim`**: 문자열의 앞뒤 공백을 제거.
- **`unique`**: 필드의 고유성(이메일 중복 방지).
- **`match`**: 정규 표현식을 통한 이메일 형식 검사.
- **`min`**: 나이 필드의 최소값 검사.
- **`default`**: 기본값 지정.

## 사용자 정의 유효성 검사(Custom Validation)

Mongoose에서는 사용자 정의 유효성 검사를 생성할 수도 있습니다. 이를 통해 특정 조건을 만족하지 않을 때 오류를 발생시킬 수 있습니다.

다음은 사용자 정의 유효성 검사를 사용한 예시입니다:
```javascript
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 참조하는 컬렉션
    required: true,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});

// 사용자 정의 유효성 검사
postSchema.path('comments').validate((comments) => {
  return comments.length <= 100; // 최대 100개 댓글 제한
}, 'Comments cannot exceed 100');

const Post = mongoose.model('Post', postSchema);

```

이 예시에서는 'comments' 필드에 대해 사용자 정의 유효성 검사를 추가했습니다. 'comments'의 길이가 100을 넘지 않도록 제한했습니다. 이는 `validate` 메서드를 사용하여 추가할 수 있습니다.

Mongoose의 유효성 검사는 데이터베이스의 데이터 무결성과 신뢰성을 유지하는 데 중요한 역할을 합니다. 이를 통해 스키마 수준에서 데이터 구조와 제약 조건을 설정할 수 있으며, 데이터가 스키마의 유효성 검사를 통과하지 않으면 오류가 발생합니다.

이렇게 할 수 있다... 

그럼 `nest`에서 PickType으로 db에 저장되는 타입으로 바로 가져와서 validation미들웨어를 만드는 방법은 없을까?

아.. 아쉽게도 없는 듯하다.. nest쓰면 PickType으로 해당 필드의 타입만 가져와서 dto로 만들수 있는데..
nest그리우니까 한번 복습하고 가자

```typescript
import { IsString } from 'class-validator';
import { PostsModel } from '../entities/posts.entity';
import { PickType } from '@nestjs/mapped-types';

//Pick, Omit, Partial->Type 반환
//PickType, OmitType, PartialType-> 값을 반환

export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
//postsModel에서 title과 content만 상속받음
```

collection 정의

```typescript
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { stringValidationMessage } from 'src/common/validation-message/string-validation.message';
import { UsersModel } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostsModel extends BaseModel {
  // @PrimaryGeneratedColumn()
  // id: number;

  //1) UsersModel과 연동한다 foreign key를 이용해서
  //2) null이 될 수 없다.
  @ManyToOne(() => UsersModel, (user) => user.posts, { nullable: false })
  author: UsersModel;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  title: string;

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  content: string;

  @Column()
  likeCount: number;

  @Column({
    nullable: true,
  })
  //"/public/posts/b5ac8835-10f2-49f0-857f-1ccc7650d344.JPG",
  //이런 형태로 이미지를 보내주면 프론트에서 앞에 도메인만 붙여서 이미지를 보여줄 수 있다.
  @Transform(({ value }) =>
    value ? `/${join(POST_PUBLIC_IMAGE_PATH, value)}` : null,
  )
  image?: string;

  @Column()
  commentCount: number;

  //UsersModel에서도 있는 컬럼이 지금 중복되고 있는 중임
  //OOP를 사용해서 묶어보자
  // @UpdateDateColumn()
  // updatedAt: Date;

  // @CreateDateColumn()
  // createdAt: Date;
}
```

아 참고로 여기에서 `stringValidationMessage`이건 common폴더에 validate폴더를 따로 만들어서 공통으로 사용할 수 있는 것들을 따로 만들어 두었다.

괜찮은 예시로 최대,최소에 대한 validation message를 만들어 주는 validate-message를 가져와 보았다,,,

```typescript
import { ValidationArguments } from 'class-validator';

export const lengthValidationMessage = (args: ValidationArguments) => {
  if (args.constraints.length === 2) {
    /**
     * ValidationArguments의 프로퍼티들
     *
     * 1) value-> 검증되고 있는 값(입력된 값)
     * 2) constraints-> 파라미터에 입력된 제한 사항들
     *    args.constraints[0]->1
     *    args.constraints[1]->20
     * 3) targetName ->검증하고 있는 클래스의 이름
     * 4) object->검증하고 있는 객체
     * 5) property ->검증되고 있는 객체의 프로퍼티 이름
     */
    //최소, 최대가 있을 때
    return `${args.property}은 ${args.constraints[0]}~${args.constraints[1]}글자를 입력해주세요.`;
  } else {
    //최소만 있을 때
    return `${args.property}은 최소 ${args.constraints[0]}글자 이상이어야 합니다.`;
  }
};
```

이렇게 동적으로 validate-message를 만들어주는 것도 가능하다..하나 만들어놓고 돌려쓰면 편함