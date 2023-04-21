interface XMLChild {
  attributes: { [key: string]: string };
  children: XMLChild[];
  name: string;
  value: string;
}
