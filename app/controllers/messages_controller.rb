class MessagesController < ApplicationController
    before_action :set_group
  
    def index
      @message = Message.new
      @messages = @group.messages.includes(:user)
      @members = @group.users
    end
  
    def create
      @message = @group.messages.new(message_params)
      @message.user_id = current_user.id  

      if @message.save
        respond_to do |format|
          format.html 
            # {redirect_to group_messages_path(@group), notice: 'メッセージが送信されました}'
          format.json 
        end
      else
        @messages = @group.messages.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください。'
        render :index
      end
    end
  
    private
  
    def message_params
      params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
      # params.require(:message).permit(:content ,:image, :user_id).merge(group_id: params[:group_id])
    end
  
    def set_group
      @group = Group.find(params[:group_id])
    end
end
