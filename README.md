
# Toni-Case #TR
Bu API Kullanıcı Auth işlemlerini, kullanıcıların birbirlerine arkadaşlık isteği gönderme işlemlerini, AWS S3 ve AWS SNS servislerinin kullanımını, Middleware kullanımını ve Mocha ile Unit Test yazımını içerir.


## Yükleme 

Öncelikle Bilgisayarınıza MongoDB kurmalısınız.
```bash 
  https://www.mongodb.com/try/download/compass
  https://www.mongodb.com/try/download/community
  Bilgisayarınıza uygun olan işletim sistemini seçerek indirme ve kurulum işlemlerini tamamlayınız.
```
Kuruluma Node.js kurarak devam ediyoruz.
```bash 
  https://nodejs.org/en/download
  Bilgisayarınıza uygun olan işletim sistemini seçerek indirme ve kurulum işlemlerini tamamlayınız.
```
Projeyi başlatmak için gerekli komut
```bash 
 npm install
 npm start
```
Mocha ile Testi başlatmak için gerekli komut
```bash 
 npm test
```

## API Kullanımı

#### Kayıt Ol

```http
  POST /user/register
```

| Parametre | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Gerekli** |
| `lastName` | `string` | **Gerekli** |
| `phone_number` | `string` | **Gerekli** |
| `email` | `string` | **Gerekli** |
| `password` | `string` | **Gerekli** |

#### Giriş Yap

```http
  POST /user/login
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Gerekli** |
| `password`      | `string` | **Gerekli** |

#### Tüm Kullanıcıların Bilgilerini Getir
```http
  GET /user/users
```

#### ID'ye Göre Kullanıcı Bilgilerini Getir 

```http
  GET /user/user/{id}
```

#### Arkadaş Ekle

```http
  POST /user/add-friend/{id}
```

| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **Gerekli** |
  
{id} parametresi isteği gönderilen kullanıcın idsine eşittir.
#### Arkadaşlık İsteğini Kabul Et

```http
  POST /user/accept/{id}
```
{id} parametresi isteği gönderilen kullanıcın idsine eşittir.
| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **Gerekli** |

#### Arkadaşlık İsteğini Reddet

```http
  POST /user/reject/{id}
```
{id} parametresi isteği gönderilen kullanıcın idsine eşittir.
| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **Gerekli** |

#### Yeni Gönderi Oluştur

```http
  POST /post/newpost
```
| Parametre | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **Gerekli** |
| `description`      | `string` | **Gerekli** |
| `image`      | `string` | **Optional** Bu parametre form-data içerisinde "image" parametresi ile ve file olarak gönderilmelidir. |

#### Tüm Gönderileri Gör

```http
  GET /post/posts
```
#### ID'ye göre Gönderi Sorgula
```http
  GET /post/posts/{id}
```

#### Kullanıcı ID'sine göre Gönderi Sorgula
```http
  GET /post/posts/user/{id}
```


## Ekran Görüntüleri

#### Örnek Login Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/login.png?raw=true)
#### Örnek Login Request ve Token Alma - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/login-token.png?raw=true)

#### Örnek Register Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/register.png?raw=true)

#### Örnek Arkadaşlık Reddetme - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/reject.png?raw=true)

#### Örnek Kullanıcı ID'ye Göre Post Getirme - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/postsall.png?raw=true)

## Kullanılan Teknolojiler

Node, Express, AWS S3, AWS SNS, MongoDB, Mocha

  
# Toni-Case #EN
This API includes User Auth operations, user friend requests to each other, use of AWS S3 and AWS SNS services, use of Middleware, and Unit Test writing with Mocha.
## Installation 

You must install MongoDB on the user's computer.
```bash 
  https://www.mongodb.com/try/download/compass
  https://www.mongodb.com/try/download/community
  Complete the download and installation processes by selecting the operating system suitable for your computer.
```
We continue the installation by installing Node.js.
```bash 
  https://nodejs.org/en/download
  Complete the download and installation processes by selecting the operating system suitable for your computer.
```
Required command to start the project
```bash 
 npm install
 npm start
```
Required to start Test with Mochakomut
```bash 
 npm test
```



## API Usage

#### Register

```http
  POST /user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **required** |
| `lastName` | `string` | **required** |
| `phone_number` | `string` | **required** 
| `email` | `string` | **required** |
| `password` | `string` | **required** |

#### Login

```http
  POST /user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **required** |
| `password`      | `string` | **required** |

#### Fetch All Users' Information
```http
  GET /user/users
```

#### Fetch User Information by ID

```http
  GET /user/user/{id}
```

#### Add Friend

```http
  POST /user/add-friend/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **required** |
  
{id} parameter is equal to the id of the requesting user.
#### Accept Friend Request

```http
  POST /user/accept/{id}
```
{id} parameter is equal to the id of the requesting user.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **required** |

#### Decline Friend Request

```http
  POST /user/reject/{id}
```
{id} parameter is equal to the id of the requesting user.
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **required** |

#### Create New Post

```http
  POST /post/newpost
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization : Bearer {token}`      | `string` | **required** |
| `description`      | `string` | **required** |
| `image`      | `string` | **Optional** This parameter should be sent in form-data with the "image" parameter and as a file. |

#### See All Posts

```http
  GET /post/posts
```
#### Get Posts By Id
```http
  GET /post/posts/{id}
```

#### Get Post By Post ID
```http
  GET /post/posts/user/{id}
```


## Screenshots

#### Example Login Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/login.png?raw=true)
#### Example Login and Get Access Token Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/login-token.png?raw=true)

#### Example Register Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/register.png?raw=true)

#### Example Reject Friend Request - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/reject.png?raw=true)

#### Example GET Post By User Id - Postman
![Uygulama Ekran Görüntüsü](https://github.com/yemredogru/toni-case/blob/main/assets/postsall.png?raw=true)

## Used Technologies

Node, Express, AWS S3, AWS SNS, MongoDB, Mocha

  