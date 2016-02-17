class CreateTasks < ActiveRecord::Migration
  def change
  	create_table :tasks do |t|
  		t.string :task_name

  		t.timestamps null: false
  	end
  end
end
