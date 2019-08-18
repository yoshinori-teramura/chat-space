json.(@message, :content, :image)

json.created_at.strftime("%Y/%m/%d %H:%M") @message.created_at
json.user_name @message.user.name
json.id @message.id