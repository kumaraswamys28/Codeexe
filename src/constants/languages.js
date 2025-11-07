export const LANGUAGES = [
   {
    id: "note",
    name: "Note",
    pistonName: "note",
    version: "0.0.0",
    sampleCode: `#Intro#

Welcome to your Code Editor!

This is your scratchpad. You can write code, take notes, or test snippets.

## How to use:

1.  Run Code:
    * Select a language 
    * Write your code.
    * Click 'Run' to execute.

    #python#
    print("Hello from Python!")

2.  Save a Note:
    * Write anything you want to save.
    * Add a tag like #note# or #todo# anywhere in the text.
    * Click 'Save'. The tag will become the title in your history.

    #note#
    Remember to refactor the Header component.
`,
  },
    {
    id: "java",
    name: "Java",
    pistonName: "java",
    version: "15.0.2",
    sampleCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  },
   
  
  {
    id: "javascript",
    name: "JavaScript",
    pistonName: "javascript",
    version: "18.15.0",
    sampleCode: `
function greet(name) {
  return "Hello, " + name + "!";
}

const result = greet("World");
console.log(result);`,
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
    version: "3.0.1",
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