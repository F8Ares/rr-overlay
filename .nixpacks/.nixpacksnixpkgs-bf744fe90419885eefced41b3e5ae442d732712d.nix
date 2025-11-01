{ pkgs ? import <nixpkgs> {} }:

let
  pythonVersion = "3.10"; # Explicitly set the Python version here
in
pkgs.mkShell {
  buildInputs = [
    pkgs.python310  # Use the correct Python version
    pkgs.nodejs
    pkgs.npm
  ];
}
