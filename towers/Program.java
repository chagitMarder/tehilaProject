
import java.util.Scanner;
public class Program {
	
	
public static void main(String[] args) {
		// TODO Auto-generated method stub
	int choice=0;
while(choice !=3) {
	 Scanner scanner = new Scanner(System.in);
	 System.out.println("Select an option:\r\n"
	 		+ "-Press 1 if your selection is a triangle.\r\n"
	 		+ "-Press 2 if your selection is a rectangle.\r\n"
	 		+ "-Press 3 to exit the program.");
	 choice= scanner.nextInt();
	 Shape shape;
	 if(choice==1) {
		 shape=new Triangle();
		 shape.run();

		
	 }
	 else if(choice==2) {
		 shape=new Rectangle(); 
		 shape.run();
	 }
	System.out.println("---------------------------------"); 
}

		
}
	}
