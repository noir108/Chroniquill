class SchedulesController < ApplicationController
  
  def index
    @schedule = Schedule.all
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

  private

  def schedule_params
    params.require(:schedule).permit(:title, :start_time, :end_time, :description).merge(user_id: current_user.id)
  end

end
