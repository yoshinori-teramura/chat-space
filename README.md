# README

#開発環境
- Ruby 2.5.1
- Rails 5.0.7.2

#account テーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique:true|
|Email|string|null: false|
|password|string|null: false, unique:true|

# Association
- has_many:accounts
- has_many:groups

#chat テーブル

|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|img|string|
|account_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|timestamp|timestamp|null: false| 
# Association
- belongs_to:account
- belongs_to:grope


#group テーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique:true|

# Association
- has_many:chats
- has_many:grope_members


#group_member テーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key:true|
|account_id|integer|null: false, foreign_key:true|

# Association
- belongs_to:account
- belongs_to:group


<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->

