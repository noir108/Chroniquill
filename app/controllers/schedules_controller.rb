class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:edit, :update, :destroy]

  def index
    @schedules = current_user.schedules

    respond_to do |format|
      format.html
      format.json { render json: @schedules }
    end
  end
  
  def index2
    @schedules_by_month = current_user.schedules.order(start_time: :asc).group_by { |s| s.start_time.strftime('%Y-%m') }
  end

  def new
    @schedule = Schedule.new
  end
  
  def create
    @schedule = Schedule.create(schedule_params)
    if @schedule.save
      redirect_to action: :index
    else
      render :new
    end
  end

def edit
end

def update
  if @schedule.update(schedule_params)
    redirect_to action: :index
  else
    render :edit
  end
end

def destroy
  return unless current_user.id == @schedule.user.id

  @schedule.destroy
  redirect_to action: :index
end


  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_time, :end_time, :description).merge(user_id: current_user.id)
  end

  def set_schedule
    @schedule = Schedule.includes(:user).find(params[:id])
  end
end