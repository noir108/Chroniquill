class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    @category = Category.new
  end

  def create
    @category = Category.create(category_params)
    redirect_to categories_path
  end

  def edit
    @category = Category.find(params[:id])
  end
  
  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      render json: { category: @category }
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  
  def destroy
    @category = Category.find(params[:id])
    return unless current_user.id == @category.user.id
    @category.destroy
    redirect_to categories_path
  end
  

  private

  def category_params
    params.require(:category).permit(:id,:name).merge(user_id: current_user.id)
  end
end
