package org.example.backend.model;

public class Test {
    private static final int y = 5;

    private static int getValue() {
        return y;
    }

    private static int x = getValue();

    public static void main(String[] args) {
        System.out.println(x); // Kết quả: 5
    }
}
