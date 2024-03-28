

public class Rectangle extends Shape {

	@Override
	public void printScope() {
		int perimeter=getWidth()*2+getHeight()*2;
		System.out.println("The perimeter of the rectangle is:  "+perimeter);
		
	}
	public void printArea() {
		int area=getWidth()*getHeight();
		System.out.println("The area of the rectangle is: "+area);
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		scan();
        double difference = Math.abs(getWidth()-getHeight());
        
        if (difference > 5) {
            this.printArea();
        } else {
           this.printScope();
        }
		
	}
	

	
}
