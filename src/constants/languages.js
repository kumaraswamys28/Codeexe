export const LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
    pistonName: "javascript",
    version: "18.15.0",
    sampleCode: `/* jshint esversion: 6 */
function greet(name) {
  return "Hello, " + name + "!";
}

const result = greet("World");
console.log(result);`,
  },
  {
    id: "java",
    name: "Java",
    pistonName: "java",
    version: "17.0.5",
    sampleCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  },
  {
    id: "c_cpp",
    name: "C",
    pistonName: "c",
    version: "10.2.0",
    sampleCode: `#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,
  },
  {
    id: "python",
    name: "Python",
    pistonName: "python",
    version: "3.10.0",
    sampleCode: `def greet(name):
  return f"Hello, {name}!"

print(greet("World"))`,
  },
  {
    id: "ruby",
    name: "Ruby",
    pistonName: "ruby",
    version: "3.0.0",
    sampleCode: `def greet(name)
  "Hello, #{name}!"
end

puts greet("World")`,
  },
  {
    id: "golang",
    name: "Go",
    pistonName: "go",
    version: "1.16.2",
    sampleCode: `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
  },
];