
import java.util.Arrays;
import java.util.Scanner;

public class Triangle extends Shape {

	@Override
	public void printScope() {
		double hypotenuse = Math.sqrt(Math.pow(getHeight(), 2) + Math.pow(getWidth(), 2));
		double perimeter = hypotenuse + hypotenuse + getWidth();
		System.out.println("The perimeter of the triangle is:  " + perimeter);
	}

	public void ptintTriangle() {
		if (getWidth() % 2 == 0 || getWidth() > getHeight() * 2) {
			System.out.println("The triangle cannot be printed. \ntry choose different sizes.");
			return;
		} else {
			this.print(getHeight(), getWidth());

		}

	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		scan();
		Scanner scanner = new Scanner(System.in);
		System.out.println("Tap 1 to calculate the perimeter of the triangle, \nTap 2 to print the triangle. ");
		int number = scanner.nextInt();
		if (number == 1)
			this.printScope();
		else if (number == 2)
			ptintTriangle();
		else
			System.out.println("Invalid selection");

	}

	public void print(int h, int w) {
		System.out.println();
		System.out.println("here is the print:");
		System.out.println();
		if (w == 1) {
			for (int i = 0; i < h; i++) {
				System.out.println("*");
			}
			return;
		}
		int count = 0;
		for (int i = w - 1; i > 1; i--) {
			if (i % 2 != 0)
				count++;
		}
		int divide = 0;
		int rest = 0;
		if (count == 0) {
			divide = h / 2;
			rest = h % 2;
			for (int i = 0; i < divide; i++) {
				System.out.println(" * ");
			}
			if (rest != 0)
				System.out.println(" * ");

			for (int i = 0; i < divide; i++) {
				System.out.println("***");
			}
			return;
		}

		divide = (h - 2) / count;
		rest = (h - 2) % count;

		String[] res = new String[h];
		Arrays.fill(res, "");
		int index = 1;

		for (int i = 0; i < w; i++) {
			if (i == w / 2)
				res[0] += "*";
			else
				res[0] += " ";
		}

		for (int i = 1; i <= count; i++) {
			for (int j = 0; j < divide; j++) {
				int stars = 1 + 2 * i;
				int spaces = (w - stars) / 2;

				for (int k = 0; k < spaces; k++) {
					res[index] += " ";
				}
				for (int k = 0; k < stars; k++) {
					res[index] += "*";
				}
				for (int k = 0; k < spaces; k++) {
					res[index] += " ";
				}
				index++;

			}
		}

		for (int i = w; i > 0; i--) {
			res[index] += "*";
		}
		for (int i = 0; i < res.length; i++) {
			if(i==1)
			  if(rest!=0)
				  for (int j = 0; j < rest; j++) {
					  System.out.println(res[i]);
				}
			System.out.println(res[i]);
		}
	}

}
