class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:edit, :update, :destroy]
  before_action :set_category, only: [:new, :create, :edit, :update]

  def index
    @schedules = current_user.schedules.includes(:category)

    respond_to do |format|
      format.html
      format.json { render json: @schedules }
    end
  end
  
  def index2
    @schedules_by_month = current_user.schedules.order(start_time: :asc).group_by { |s| s.start_time.strftime('%Y-%m') }
    @category = Category.new
  end

  def new
    @schedule = Schedule.new
    @category = Category.new

  end
  
  def create
    @schedule = Schedule.create(schedule_params)
    if @schedule.save
      redirect_to root_path
    else
      render :new
    end
  end

def edit
end

def update
  if @schedule.update(schedule_params)
    redirect_to root_path
  else
    render :edit
  end
end

def destroy
  return unless current_user.id == @schedule.user.id
  @schedule.destroy
  redirect_to root_path
end


  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_time, :end_time, :description, :category_id).merge(user_id: current_user.id)
  end

  def set_schedule
    @schedule = Schedule.includes(:user).find(params[:id])
  end

  def set_category
    @categories = current_user.categories
  end
  
end